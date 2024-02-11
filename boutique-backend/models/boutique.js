// Require the pool instance from the db.js file
const pool = require('../db');

// Define a function to get all items from a table
const getAllBoutiques = async () => {
  try {
    // Replace 'your_table_name' with the actual table name you want to select from
    const result = await pool.query('SELECT * FROM boutiques');
    return result.rows;
  } catch (err) {
    console.error(err.message);
    // Depending on your error handling you might want to throw the error or handle it differently
    throw err;
  }
};

const getSelectableColumns = async () => {
  try {
    const query1 = `SELECT column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'boutiques';`;
    const query2 = `SELECT column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'boutique_address';`;

    const result1 = await pool.query(query1);
    const result2 = await pool.query(query2);

    const columns1 = result1.rows.map((row) => row.column_name);
    const columns2 = result2.rows.map((row) => row.column_name);

    // Combine and remove duplicates if necessary
    const combinedColumns = [...new Set([...columns1, ...columns2])];

    return combinedColumns;
  } catch (error) {
    console.error('Error fetching selectable columns:', error);
    throw error; // Ensure you handle this error in your route/controller
  }
};

const constructSafeQuery = (selectedColumns, filters, sortCriteria) => {
  // Prefix columns with the appropriate table alias
  const prefixedColumns = selectedColumns.map((col) => {
    if (col === 'customer_number') return 'b.customer_number';
    if (col === 'level') return 'b.level';
    if (col === 'name') return 'b.name';
    if (col === 'active') return 'b.active';
    return col.includes('.') ? col : `b1.${col}`; // Default to b1 for other columns
  });

  // Directly incorporate filter values into the query, safely
  const filterConditions = Object.entries(filters)
    .map(([column, value]) => {
      if (value) {
        // Assuming all filters are to be case-insensitive and values need to be escaped
        const escapedValue = `'${value.replace(/'/g, "''").toLowerCase()}'`; // Basic SQL escaping
        return `LOWER(${column}) = LOWER(${escapedValue})`;
      }
      return null;
    })
    .filter((condition) => condition !== null);

  const whereClause =
    filterConditions.length > 0
      ? ` WHERE ${filterConditions.join(' AND ')}`
      : '';

  // Handle sortCriteria as before, but ensure no placeholders are used
  let orderByClause = '';
  if (sortCriteria && sortCriteria.column && sortCriteria.direction) {
    const safeDirection = ['ASC', 'DESC'].includes(
      sortCriteria.direction.toUpperCase()
    )
      ? sortCriteria.direction.toUpperCase()
      : 'ASC';
    const safeColumn = prefixedColumns.find((prefixedCol) =>
      prefixedCol.endsWith(sortCriteria.column)
    )
      ? sortCriteria.column
      : null;
    if (safeColumn) {
      const isBoutiqueColumn = [
        'customer_number',
        'level',
        'name',
        'active',
      ].includes(safeColumn);
      const tableAlias = isBoutiqueColumn ? 'b' : 'b1';
      const columnWithAlias = `${tableAlias}.${safeColumn}`;
      orderByClause = ` ORDER BY ${columnWithAlias} ${safeDirection}`;
    }
  }

  // Construct the final query without placeholders for dynamic values
  const queryText = `SELECT ${prefixedColumns.join(',')} FROM boutiques as b INNER JOIN boutique_address AS b1 ON b.customer_number = b1.customer_number${whereClause}${orderByClause}`;
  console.log('Query Text:', queryText);

  return { text: queryText };
};

const getReportData = async (selectedColumns, filters, sortCriteria) => {
  try {
    const query = constructSafeQuery(selectedColumns, filters, sortCriteria);
    const result = await pool.query(query.text, query.values);
    return result.rows;
  } catch (error) {
    console.error('Error fetching report data:', error);
    throw error;
  }
};

const createReportTable = async (tableName, columns) => {
  const columnDefinitions = columns
    .map((column) => `${column} TEXT`)
    .join(', ');
  const query = `CREATE TABLE ${tableName} (${columnDefinitions})`;
  await pool.query(query);
};

const insertReportData = async (tableName, columns, data) => {
  const queryText = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES ($1, $2)`;

  try {
    await pool.query(queryText, [data[0].report_name, data[0].query_text]);
  } catch (error) {
    console.error('Error inserting report data:', error);
    throw error;
  }
};

// Export the function so it can be used in other parts of your application
module.exports = {
  getAllBoutiques,
  getSelectableColumns,
  getReportData,
  createReportTable,
  insertReportData,
  constructSafeQuery,
};
