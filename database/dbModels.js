const mongoose = require('mongoose'); // include DB object

mongoose.connect('mongodb://localhost/restaurants');

const availabilitySchema = mongoose.Schema({
  id: {type:Number, unique: true},
  availability: [{
    day: Number,
    hour: Number,
    minute: Number
  }],
});

const bookingsSchema = mongoose.Schema({
  id: {type:Number, unique: true},
  bookings: [{
    day: Number,
    bookings_count: Number
  }],
});

let Availability = mongoose.model('Reservation', availabilitySchema);
let Bookings = mongoose.model('Booking', bookingsSchema);

module.exports.availability = Availability;
module.exports.bookings = Bookings; 