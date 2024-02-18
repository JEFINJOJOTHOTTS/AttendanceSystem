const express = require('express');
const router = express.Router();

const validation = require('../middleware/validation');
const instructorController = require('../controllers/instructorController');

//attendance in & out entry
router.post('/in',validation.dateTimeValidation, instructorController.inDateTime);
router.post('/out',validation.dateTimeValidation, instructorController.outDateTime);

//api request for report
router.post('/',validation.reportRequestValidation, instructorController.getReport);

module.exports = router;