const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  FlightNumber: { type: String, required: true },
  DepartureAirport: { type: String, required: true },
  ArrivalAirport: { type: String, required: true },
  DepartureTime: { type: Date, required: true },
  ArrivalTime: { type: Date, required: true },
  Airline: { type: String, required: true },
  AircraftType: { type: String, required: true }
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;
