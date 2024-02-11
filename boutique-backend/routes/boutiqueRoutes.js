const express = require('express');
const BoutiqueController = require('../controllers/boutiqueController');
const router = express.Router();

router.get('/', BoutiqueController.getAllBoutiques);
router.get('/columns', BoutiqueController.getSelectableColumns);
router.post('/report', BoutiqueController.getReportData);
router.post('/saveReport', BoutiqueController.saveReport);

module.exports = router;
