// const mongoose = require('mongoose'); // include DB object
// const seed = require('./dataGenerator');
// const models = require('./dbModels');

// let Availability = models.availability;
// let Bookings = models.bookings;

// const db = mongoose.connection

// db.once('open', function(){
//   console.log('open connection');
// });

// db.on('error', (err) => {
//   console.log('error: ', err);
//   throw err;
// })

// console.log("before mongodb query")

// seed.availabilityData.slice(0, 20).forEach(obj => {
//   let doc = new Availability(obj);
//   console.log("created availability!", doc);
//   doc.save((err, data) => {
//     if (err) {
//       console.log('error');
//     }
//     console.log("success 1");
//   });
// });

// console.log("after mongo query 1")

// seed.bookingsData.slice(0, 20).forEach(obj => {
//   let doc = new Bookings(obj);
//   console.log("created booking!", doc);
//   doc.save((err, data) => {
//     if (err) {
//       console.log('error');
//     }
//     console.log("success 2");
//   });
// });


// console.log("after mongo query 2")


//<>><><><
// console.log(process._getActiveHandles());
// console.log(seed.bookingsData[0]);

// Availability.create(seed.availabilityData, (err, entries)=>{
//   if (err){
//     console.log('Error seeding restaurant availbility data', err);
//     return;
//   }
//   console.log('Successfully seeded restaurant availability data', entries);

// });

// Bookings.create(seed.bookingsData, (err, entries)=>{
//   if (err){
//     console.log('Error seeding bookings count data', err);
//     return;
//   }
//   console.log('Successfully seeded bookings count data', entries);
// });



///////////////////////////////////////////////////////////////////////


const mongoose = require('mongoose'); // include DB object
const seed = require('./dataGenerator');
const models = require('./dbModels');

const Promise = global.Promise

mongoose.connect('mongodb://localhost/restaurants');

const db = mongoose.connection

db.once('open', function(){
  console.log('open connection');
});

db.on('error', (err) => {
  console.log('error: ', err);
  throw err;
})

let Availability = models.availability;
let Bookings = models.bookings;

console.log('done generating data');
// console.log(seed.availabilityData);

const mySeedDataAvail = seed.availabilityData.slice(0,10000)
const mySeedDataBookings = seed.bookingsData.slice(0,10000)

console.log("availability legnth: ", seed.availabilityData.length)
console.log("bookings legnth: ", seed.bookingsData.length)


console.log(mySeedDataAvail.length)
console.log(mySeedDataBookings.length)

var avail = Availability.insertMany(mySeedDataAvail);
var bookings = Bookings.insertMany(mySeedDataBookings);


Promise.all([avail, bookings])
  .then( () => {
    mongoose.connection.close();
    console.log("all done");
  })

