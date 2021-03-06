const mongoose = require('mongoose'); // include DB object

mongoose.connect('mongodb://localhost/testrestaurants');

const availabilitySchema = mongoose.Schema({
  id: {type:Number, unique: true},
  bk: String,
  av: String,
});

// const bookingsSchema = mongoose.Schema({
//   id: {type:Number, unique: true},
//   bookings: [{
//     day: Number,
//     bookings_count: Number
//   }],
// });

let Availability = mongoose.model('testrestaurant', availabilitySchema);
// let Bookings = mongoose.model('Booking', bookingsSchema);

module.exports.availability = Availability;
// module.exports.bookings = Bookings; 