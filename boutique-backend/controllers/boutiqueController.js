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

  // You can add more controller methods for other CRUD operations
};

module.exports = BoutiqueController;