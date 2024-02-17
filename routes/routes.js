const express = require('express');
const router = express.Router();

//controllers
const instructorController = require('../controllers/instructorController');

router.post('/in', instructorController.inDateTime);
router.post('/out', )

module.exports = router;