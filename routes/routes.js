const express = require('express');
const router = express.Router();

const validation = require('../middleware/validation');
const instructorController = require('../controllers/instructorController');
const jwt = require("../middleware/jwt");

//attendance in & out entry
router.post('/checkIn',jwt.verify, validation.dateTimeValidation, instructorController.inDateTime);
router.post('/checkOut',jwt.verify,validation.dateTimeValidation, instructorController.outDateTime);

//api request for report
router.post('/',validation.reportRequestValidation, instructorController.getReport);

module.exports = router;