const express = require('express');
const router = express.Router();
const validation = require('../middleware/validation')
//controllers
const instructorController = require('../controllers/instructorController');

router.post('/in',validation.dateTimeValidation, instructorController.inDateTime);
router.post('/out',validation.dateTimeValidation, instructorController.outDateTime);

router.get('/',validation.dateTimeValidation, instructorController.getReport)
module.exports = router;