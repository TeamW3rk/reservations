///////////////////////////////////////////////////////////////////////


const mongoose = require('mongoose'); // include DB object
const seed = require('./dataGenerator');
const models = require('./dbModels');

console.log(seed.generate1000availibilityData());
console.log(seed.generate1000bookingData());


const Promise = global.Promise

mongoose.connect('mongodb://localhost/restaurants');

const db = mongoose.connection;

db.once('open', function(){
  console.log('open connection');
});

db.on('error', (err) => {
  console.log('error: ', err);
  throw err;
})

let Availability = models.availability;
let Bookings = models.bookings;

console.log("availability legnth: ", seed.availabilityData.length)
console.log("bookings legnth: ", seed.bookingsData.length)


var avail = Availability.insertMany(seed.availabilityData);
var bookings = Bookings.insertMany(seed.bookingsData);


Promise.all([avail, bookings])
  .then( () => {
    mongoose.connection.close();
    console.log("all done");
  })
