const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

// generates random minutes between 0 - 45
let randomMinutes = function randomMinutes() {
  let random = randomInt(0, 3);
  let minutes = {
    0: 0,
    1: 15,
    2: 30,
    3: 45,
  };
  return minutes[random];
};

let initializeBookings = function (restaurant, day) {
  restaurant.bookings.push({
    day,
    bookings_count: randomInt(0, 50),
  });
};

let generateRandomTimeSlots = function generateRandomTimeSlots(restaurant, day, numSlots) {
  for (let i = 0; i < numSlots; i++) {
    restaurant.availability.push({
      day,
      hour: randomInt(15, 22),
      minute: randomMinutes(),
    });
  }
};

// let generateAvailabilityData = function () {
//     let availabilityData = [];

//     for (let i = 0; i < 1; i++) {
//       // instantiate empty restaurant object
//       let restaurant = {
//         id: i,
//         availability: [],
//       };

//       for (let day = 1; day <= 31; day++) {
//         generateRandomTimeSlots(restaurant, day, randomInt(0, 7)); // Randomize number of available slots per day

//       }
//       availabilityData.push(restaurant); // push restaurant object into raw data array

//     }
//     return availabilityData;
//   };


// let generateBookingData = function () {
//   let bookingsData = [];
//   for (let i = 0; i < 1; i++) {
    
//     let bookings = { id: i, bookings: [],};

//     for (let day = 1; day <= 31; day++) {
//       initializeBookings(bookings, day);
//     }
//     bookingsData.push(bookings);
//   }
//   return bookingsData;
// };

let generateRestaurant = function (id) {
  let restaurant = {
    id: id,
    availability: [],
  };
  for (let day = 1; day <= 31; day++) {
    generateRandomTimeSlots(restaurant, day, randomInt(0, 7)); 

  }
  return restaurant;
};


let generateBookings = function (id) {
  let bookings = { id: id, bookings: [],};

  for (let day = 1; day <= 31; day++) {
    initializeBookings(bookings, day);
  }
  return bookings;
};



var populateDatabaseWithRestaurants = async function() {
  const client = await MongoClient.connect(url);
  const db = client.db('testrestaurants');
  const collection = db.collection('testrestaurants');
  var availabilityData = []; 

  var start = new Date();
  console.log(start);

  for (var i = 1; i <= 10000000; i++) {
    availabilityData.push(generateRestaurant(i));
    if (i % 1000 === 0) {
      await collection.insertMany(availabilityData);
      availabilityData = [];
    }
    if (i % 1000000 === 0) {
      console.log((new Date() - start) / 60000, i);
    }
  } 
  console.log((new Date() - start) / 60000);
  process.exit();
}

populateDatabaseWithRestaurants();