const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const helper = require('./dataGenerationHelpers')

var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length; // 8

var populateDatabaseWithRestaurants = async function() {
  var client = await MongoClient.connect(url);
  var db = client.db('testrestaurants');
  var collection = db.collection('testrestaurants');
  var id = cluster.worker.id - 1;
  var startTime = new Date();
  var availabilityData = [];

  var start = id * (10000000 / numCPUs)  + 1 // 
  var stop = (id + 1) * (10000000 / numCPUs);
 // console.log('worker: ', id, '----',start, '----', stop);

  for (var i = start; i <= stop; i++) {
    availabilityData.push(helper.generateRestaurant(i));

    if (i % 1000 === 0) {
      await collection.insertMany(availabilityData);
      availabilityData = []
    }

    if (i % 1000000 === 0) {
      console.log((new Date() - startTime) / 60000, i);
    }
  } 
  console.log('Final time in min: ', (new Date() - startTime) / 60000);
  process.exit();
}


if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  let count = 0; 
  cluster.on('exit', async (worker, code, signal) => {
    
    count++;

    if (count === numCPUs) {
      var client = await MongoClient.connect(url);
      var db = client.db('testrestaurants');
      var collection = db.collection('testrestaurants');
      await collection.createIndex({id: 1});
      client.close();
    }
    
    console.log(`worker ${worker.process.pid} finished`);
  });
} else {
  populateDatabaseWithRestaurants();
  console.log(`Worker ${process.pid} started`);
}
