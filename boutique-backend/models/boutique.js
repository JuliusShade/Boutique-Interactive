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

const constructSafeQuery = (selectedColumns, filters) => {
  // Prefix columns with the appropriate table alias
  const prefixedColumns = selectedColumns.map((col) => {
    if (col === 'customer_number') {
      return 'b.customer_number'; // Assuming you want to refer to the 'boutiques' table
    }
    if (col === 'level') {
      return 'b.level'; // Assuming you want to refer to the 'boutiques' table
    }
    if (col === 'name') {
      return 'b.name'; // Assuming you want to refer to the 'boutiques' table
    }
    if (col === 'active') {
      return 'b.active'; // Assuming you want to refer to the 'boutiques' table
    }
    return col.includes('.') ? col : `b1.${col}`; // Prefix non-aliased columns with 'b.'
  });

  const filterValues = [];
  const filterConditions = Object.keys(filters).map((key, index) => {
    filterValues.push(filters[key].toLowerCase()); // Convert filter value to lowercase for case-insensitive comparison

    // Determine the correct table alias for each filter key based on your column prefixing logic
    let prefixedKey;
    if (
      key === 'customer_number' ||
      key === 'level' ||
      key === 'name' ||
      key === 'active'
    ) {
      prefixedKey = `b.${key}`; // Columns that belong to the 'boutiques' table
    } else {
      prefixedKey = `b1.${key}`; // Assuming all other columns belong to 'boutique_address'
    }

    // Apply LOWER for case-insensitive comparison, correctly using the table alias
    return `LOWER(${prefixedKey}) = LOWER($${index + 1})`;
  });

  // Construct the WHERE clause, or leave it empty if there are no filters
  const whereClause =
    filterConditions.length > 0
      ? ` WHERE ${filterConditions.join(' AND ')}`
      : '';

  // Construct the final query
  const queryText = `SELECT ${prefixedColumns.join(', ')} FROM boutiques as b INNER JOIN boutique_address AS b1 ON b.customer_number = b1.customer_number${whereClause}`;

  return {
    text: queryText,
    values: filterValues,
  };
};

const getReportData = async (selectedColumns, filters) => {
  try {
    const query = constructSafeQuery(selectedColumns, filters);
    const result = await pool.query(query.text, query.values);
    return result.rows;
  } catch (error) {
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
  // Construct placeholders for parameterized query
  const placeholders = data
    .map(
      (_, rowIndex) =>
        `(${columns.map((_, colIndex) => `$${rowIndex * columns.length + colIndex + 1}`).join(', ')})`
    )
    .join(', ');

  // Flatten the data for parameterized query
  const flattenedData = data.reduce((acc, row) => {
    const rowData = columns.map((col) => row[col]);
    return [...acc, ...rowData];
  }, []);

  const queryText = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES ${placeholders}`;

  try {
    await pool.query(queryText, flattenedData);
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
};
