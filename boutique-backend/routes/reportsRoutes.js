const express = require('express');
const reportsController = require('../controllers/reportsController');
const router = express.Router();

router.get('/', reportsController.getAllReports);
router.delete('/', reportsController.deleteSelectedReports);

module.exports = router;
