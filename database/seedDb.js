const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

var cluster = require('cluster');
var http = require('http');
var  numCPUs = require('os').cpus().length; // 8


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
    restaurant.av.push(
      {
      d: day,
      h: randomInt(15, 22),
      m: randomMinutes(),
    });
  }
};


let generateRestaurant = function (id) {
  let restaurant = {
    id: id,
    av: [],
  };
  for (let day = 1; day <= 31; day++) {
   // generateRandomTimeSlots(restaurant, day, randomInt(0, 7)); 
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
  var client = await MongoClient.connect(url);
  var db = client.db('testrestaurants');
  var collection = db.collection('testrestaurants');
  var id = cluster.worker.id - 1;
  var availabilityData = []; 

  var start = id * (1000000 / numCPUs) // 
  var stop = (id + 1) * (10000000 / numCPUs);
  //console.log('worker: ', id, '----',start, '----', stop);

  for (var i = start; i < stop; i++) {

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


if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} finished`);
  });
} else {
  populateDatabaseWithRestaurants();
  console.log(`Worker ${process.pid} started`);
}

