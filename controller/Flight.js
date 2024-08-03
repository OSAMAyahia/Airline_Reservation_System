const Flight = require("../model/Flight");

exports.Create_Flight = async (req, res) => {
    try {
        const data = req.body;

        await Flight.create({
            FlightNumber: data.FlightNumber,
            DepartureAirport: data.DepartureAirport,
            ArrivalAirport: data.ArrivalAirport,
            DepartureTime: data.DepartureTime,
            ArrivalTime: data.ArrivalTime,
            Airline: data.Airline,
            AircraftType: data.AircraftType
        });

        req.flash('success_msg', 'Flight created successfully');
        res.redirect('/flight/list');
    } catch (error) {
        console.log(error);
        req.flash('error_msg', 'Error creating flight');
        res.redirect('/flight/create');
    }
};

exports.List_Flights = async (req, res) => {
    try {
        const flights = await Flight.find({});
        res.render('flights', { flights, user: req.user, messages: req.flash() });
    } catch (error) {
        console.log(error);
        req.flash('error_msg', 'Error retrieving flights');
        res.redirect('/booking/list');
    }
};

exports.Show_Create_Flight_Form = (req, res) => {
    res.render('create_flight', { messages: req.flash() });
};
    