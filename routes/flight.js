const express = require('express');
const router = express.Router();
const flightController = require('../controller/Flight');


router.get('/create', flightController.Show_Create_Flight_Form);

router.post('/create', flightController.Create_Flight);

router.get('/list', flightController.List_Flights);

module.exports = router;
