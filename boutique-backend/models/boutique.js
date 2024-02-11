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
    return col.includes('.') ? col : `b.${col}`; // Prefix non-aliased columns with 'b.'
  });

  const query = {
    text: `SELECT ${prefixedColumns.join(', ')} FROM boutiques as b INNER JOIN boutique_address AS b1 ON b.customer_number = b1.customer_number WHERE `,
    values: [],
  };

  const filterKeys = Object.keys(filters);
  if (filterKeys.length) {
    query.text += filterKeys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(' AND ');
    query.values = Object.values(filters);
  } else {
    // Remove WHERE clause if no filters are provided
    query.text = query.text.replace('WHERE ', '');
  }

  return query;
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

// Export the function so it can be used in other parts of your application
module.exports = {
  getAllBoutiques,
  getSelectableColumns,
  getReportData,
};
