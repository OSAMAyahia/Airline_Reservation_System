const express = require('express');
const router = express.Router();
const bookingController = require('../controller/Booking');


router.get('/list', bookingController.List_Bookings);


router.get('/create', (req, res) => {
    res.render('booking');
});

router.post('/create', bookingController.Create_Booking);

module.exports = router;

