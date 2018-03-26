

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
    restaurant.av += day.toString() + ',' + randomInt(15, 22).toString() + ',' + randomMinutes().toString() + ',' ;
  }
};


let generateRestaurant = function (id) {
  let restaurant = {
    id: id,
    bk: '',
    av: ''
  };
  for (let day = 1; day <= 31; day++) {
    generateRandomTimeSlots(restaurant, day, randomInt(0, 7)); 
    restaurant.bk += randomInt(0, 50) + ",";
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

module.exports.generateRestaurant = generateRestaurant;