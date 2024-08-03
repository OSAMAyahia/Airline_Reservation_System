const Booking = require("../model/Booking");

exports.Create_Booking = async (req, res) => {
    try {
        const data = req.body;

        await Booking.create({
            PassengerID: data.PassengerID,
            FlightID: data.FlightID,
            BookingDate: data.BookingDate,
            SeatNumber: data.SeatNumber,
            Class: data.Class,
            Price: data.Price,
            Status: data.Status
        });

        req.flash('success_msg', 'Booking created successfully');
        res.redirect('/booking/list');
    } catch (error) {
        console.log(error);
        req.flash('error_msg', 'Error creating booking');
        res.redirect('/booking/create');
    }
};

exports.List_Bookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
        // .populate('PassengerID')
        // .populate('FlightID');
        res.render('listBookings', { bookings });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error fetching bookings');
    }
};
