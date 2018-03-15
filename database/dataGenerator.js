/*
Data Generator File
This js file initializes random restaurant availability data that will be seeded into the DB
*/

let availabilityData = [];
let bookingsData = [];

// generate a random number between two values inclusive
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
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

let generateRandomRestaurantData = function generateRandomRestaurantData() {
  // initialize 200 restaurant ids
  for (let i = 0; i < 1000; i++) {
    // instantiate empty restaurant object
    let restaurant = {
      id: i,
      availability: [],
    };
    let bookings = {
      id: i,
      bookings: [],
    };
    // Generate Time Slots for each of 30 days
    for (let day = 1; day <= 31; day++) {
      generateRandomTimeSlots(restaurant, day, randomInt(5, 5)); // Randomize number of available slots per day
      initializeBookings(bookings, day);
    }
    availabilityData.push(restaurant); // push restaurant object into raw data array
    bookingsData.push(bookings);
  }
};

generateRandomRestaurantData();

/////////////////////////////////

let generate1000availibilityData = function () {
  let availabilityData = [];
  for (let i = 0; i < 1000; i++) {

    let restaurant = { id: i, availability: [], };

    for (let day = 1; day <= 31; day++) {
      generateRandomTimeSlots(restaurant, day, randomInt(5, 5));
    }
    availabilityData.push(restaurant); // push restaurant object into raw data array
  }
  return availabilityData[0];
};

let generate1000bookingData = function () {
  let bookingsData = [];
  for (let i = 0; i < 1000; i++) {
    
    let bookings = { id: i, bookings: [],};
    // Generate Time Slots for each of 30 days
    for (let day = 1; day <= 31; day++) {
      initializeBookings(bookings, day);
    }
    bookingsData.push(bookings);
  }
  return bookingsData[0];
};
//////////////////////////////////

module.exports.availabilityData = availabilityData;
module.exports.bookingsData = bookingsData;

// for testing

module.exports.randomMinutes = randomMinutes;
module.exports.randomInt = randomInt;
module.exports.generateRandomTimeSlots = generateRandomTimeSlots;


module.exports.generate1000availibilityData = generate1000availibilityData;
module.exports.generate1000bookingData = generate1000bookingData;