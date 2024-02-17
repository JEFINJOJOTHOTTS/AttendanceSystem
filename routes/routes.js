const express = require('express');
const router = express.Router();

//controllers
const instructorController = require('../controllers/instructorController');

router.post('/in', instructorController.inDateTime);
router.post('/out', instructorController.outDateTime);

module.exports = router;