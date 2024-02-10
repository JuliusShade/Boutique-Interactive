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
  const result = await pool.query('SELECT b.customer_number, b.type, b.active, b1.address_name, b1.street, b1.street2, b1.city, b1.state, b1.zipcode, b1.type FROM boutiques as b INNER JOIN boutique_address AS b1 ON b.customer_number = b1.customer_number');
  return result.rows;
}

// Export the function so it can be used in other parts of your application
module.exports = {
  getAllBoutiques,
  getSelectableColumns
};
