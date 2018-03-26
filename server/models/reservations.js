const mongoose = require('mongoose');
const models = require('../../database/dbModels');

mongoose.connect('mongodb://localhost/testrestaurants');

//searches a DB Model for particular id, and invokes callback on it
const findInDb = function findInDb(model, id, res, callback){

  model.find({id:id}, (err, result)=>{

    if (err || result[0] === undefined){
      console.log('Error retrieving data', err || 'no results from DB');
      res.status(500).send(err);
      return;
    }
    callback(result[0]);
  });
}

//Query db for specific restaurant availability times
const availability = function availability(id, res, callback){
  findInDb(models.availability, id, res, callback);
}

//Query db for specific restaurant booking times
// const bookingsCount = function bookingsCount(id, res, callback){
//   findInDb(models.bookings, id, res, callback);
// }

module.exports.availability = availability;
// module.exports.bookings = bookingsCount;

