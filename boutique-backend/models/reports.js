const pool = require('../db');

const createReportsTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS reports (
        id SERIAL PRIMARY KEY,
        report_name TEXT,
        query_text TEXT
      )
    `;
    await pool.query(query);
  } catch (error) {
    console.error('Error creating reports table:', error);
    throw error;
  }
};

const getAllReports = async () => {
  try {
    const result = await pool.query('SELECT * FROM reports');
    return result.rows;
  } catch (error) {
    console.error('Error fetching reports:', error);
    throw error;
  }
};

const deleteReports = async (reportIds) => {
  try {
    const placeholders = reportIds.map((_, index) => `$${index + 1}`).join(',');
    const query = `DELETE FROM reports WHERE id IN (${placeholders})`;
    await pool.query(query, reportIds);
  } catch (error) {
    console.error('Error deleting reports:', error);
    throw error;
  }
};

module.exports = {
  createReportsTable,
  getAllReports,
  deleteReports,
};
