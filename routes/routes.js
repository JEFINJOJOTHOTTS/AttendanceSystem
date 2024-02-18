const express = require('express');
const router = express.Router();
const validation = require('../middleware/validation')
//controllers
const instructorController = require('../controllers/instructorController');

router.post('/in',validation.dateTimeValidation, instructorController.inDateTime);
router.post('/out',validation.dateTimeValidation, instructorController.outDateTime);

router.post('/', instructorController.getReport)
module.exports = router;