const boutiqueModel = require('../models/boutique');

const BoutiqueController = {
  // Function to handle a GET request to fetch all items
  getAllBoutiques: async (req, res) => {
    try {
      const boutiques = await boutiqueModel.getAllBoutiques();
      res.json(boutiques);
    } catch (error) {
      // Send a server error response if something goes wrong
      res.status(500).json({ message: error.message });
    }
  },

  getSelectableColumns: async (req, res) => {
    try {
      const boutiques = await boutiqueModel.getSelectableColumns();
      res.json(boutiques);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getReportData: async (req, res) => {
    try {
      const { selectedColumns, filters } = req.body;
      const data = await boutiqueModel.getReportData(selectedColumns, filters);
      res.json(data);
    } catch (error) {
      console.error('Error in getReportData:', error.message);
      res.status(500).send('Internal Server Error');
    }
  },

  saveReport: async (req, res) => {
    const { reportName, selectedColumns, reportData } = req.body;

    // Basic sanitization and validation (expand based on your requirements)
    const sanitizedTableName = reportName.replace(/[^a-zA-Z0-9_]/g, '');
    if (!sanitizedTableName || !selectedColumns.length || !reportData.length) {
      return res.status(400).send('Invalid report data');
    }

    try {
      await boutiqueModel.createReportTable(
        sanitizedTableName,
        selectedColumns
      );
      await boutiqueModel.insertReportData(
        sanitizedTableName,
        selectedColumns,
        reportData
      );
      res.send('Report saved successfully');
    } catch (error) {
      console.error('Error saving report:', error);
      res.status(500).send('Failed to save the report');
    }
  },
};

module.exports = BoutiqueController;
