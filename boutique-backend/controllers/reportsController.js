const reportsModel = require('../models/reports');

const ReportsController = {
  createReportsTable: async (req, res) => {
    try {
      await reportsModel.createReportsTable();
      res.send('Reports table created successfully');
    } catch (error) {
      console.error('Error creating reports table:', error);
      res.status(500).send('Failed to create reports table');
    }
  },

  getAllReports: async (req, res) => {
    try {
      const reports = await reportsModel.getAllReports();
      res.json(reports);
    } catch (error) {
      console.error('Error fetching reports:', error);
      res.status(500).json({ message: 'Failed to fetch reports' });
    }
  },

  deleteSelectedReports: async (req, res) => {
    try {
      const { reportIds } = req.body; // Assuming an array of IDs is sent in the request body
      if (!reportIds || reportIds.length === 0) {
        return res.status(400).send('No report IDs provided');
      }

      await reportsModel.deleteReports(reportIds);
      res.send('Reports deleted successfully');
    } catch (error) {
      console.error('Error deleting reports:', error);
      res.status(500).send('Failed to delete reports');
    }
  },
};

module.exports = ReportsController;
