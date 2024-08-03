const mongoose=require ("mongoose")

const BookingSchema =new mongoose.Schema({
    PassengerID: { type : mongoose.Schema.Types.ObjectId ,ref : "Passenger" ,required :true},
    FlightID: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight', required: true },
    BookingDate: { type: Date, required: true },
    SeatNumber: { type: String, required: true },
    Class: { type: String, enum: ['Economy', 'Business', 'First'], required: true },
    Price: { type: Number, required: true },
    Status: { type: String, enum: ['Confirmed', 'Cancelled', 'Pending'], required: true }
})

const Booking= mongoose.model("Booking",BookingSchema)

module.exports=Booking;