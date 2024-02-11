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
      const { selectedColumns, filters, sortCriteria } = req.body; // Include sortCriteria
      const data = await boutiqueModel.getReportData(
        selectedColumns,
        filters,
        sortCriteria
      ); // Pass sortCriteria to the model
      res.json(data);
    } catch (error) {
      console.error('Error in getReportData:', error.message);
      res.status(500).send('Internal Server Error');
    }
  },

  saveReport: async (req, res) => {
    const { reportName, selectedColumns, filters, sortCriteria } = req.body;

    // Basic sanitization and validation (expand based on your requirements)
    const sanitizedReportName = reportName.replace(/[^a-zA-Z0-9_]/g, '');
    if (!sanitizedReportName || !selectedColumns.length) {
      return res.status(400).send('Invalid report data');
    }

    try {
      let queryText = await boutiqueModel.constructSafeQuery(
        selectedColumns,
        filters,
        sortCriteria
      );

      // Extract the pure query without sorting criteria
      let pureQueryText = queryText.text.replace(/\sORDER\sBY\s.*/i, '');

      // Append sorting direction if sortCriteria is defined
      if (
        sortCriteria &&
        sortCriteria.direction &&
        sortCriteria.column !== null
      ) {
        pureQueryText += ` ORDER BY ${sortCriteria.column} ${sortCriteria.direction}`;
      }

      // Insert the report name and pure query text into the reports table
      await boutiqueModel.insertReportData(
        'reports',
        ['report_name', 'query_text'],
        [{ report_name: sanitizedReportName, query_text: pureQueryText }]
      );

      res.send('Report saved successfully');
    } catch (error) {
      console.error('Error saving report:', error);
      res.status(500).send('Failed to save the report');
    }
  },
};

module.exports = BoutiqueController;
