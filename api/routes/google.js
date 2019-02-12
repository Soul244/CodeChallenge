const express = require('express');
const router = express.Router();
const GoogleController = require('../controllers/google-controller');

router.post('/distance', GoogleController.Get_Distance);

module.exports = router;
