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
};

module.exports = BoutiqueController;
