const express = require('express');
const BoutiqueController = require('../controllers/boutiqueController');
const router = express.Router();

// Route that handles GET request to '/items' endpoint
router.get('/', BoutiqueController.getAllBoutiques);

module.exports = router;