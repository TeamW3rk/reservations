const pgp = require('pg-promise')({});
const schema = 'CREATE DATABASE reservations2';
const path = require('path');
const data = require('./generateDataPg');
const QueryFile = pgp.QueryFile;

const sql = (file) => {
   const filePath  = path.join(__dirname, file);
   return new QueryFile(filePath, { minify: true });
}

const table = sql('/table.sql');
const associateTables = sql('/associate.sql');

const createTable = async () => {
  let db = pgp({
    host: 'localhost', 
    port: 5432, 
    database: 'postgres',
    user: 'kylechambers'
  });
  await db.none(schema);
  db.$pool.end;
  db = pgp({
    host: 'localhost', 
    port: 5432, 
    database: 'reservations2',
    user: 'kylechambers'
  })
  return db.none(table).then(() => db)
};

const csTime = new pgp.helpers.ColumnSet(
  ['id', 'day', 'hour', 'min'],
  {table: 'time_slots'},
); 

const csRestaurants = new pgp.helpers.ColumnSet(
  ['id', 'name', 'bookings'],
  {table: 'restaurants'},
); 

const csAvailibilites = new pgp.helpers.ColumnSet(
  ['id', 'restaurant_id', 'time_id'],
  {table: 'availibilities'},
); 

const createTimeSlots = async (db) => {
  await db.none(pgp.helpers.insert(data.availibilitySlots, csTime))
  .then(()=>{
    console.log('Done making timeSlots table')
  })
}

const createRestaurants = async (db) => {
  let startTime = new Date();
  let restaurantsData = []


  for (let i = 1; i <= 10000000; i++){
    let restaurantName = data.generateRestaurantName();
    let rest = {
      id: i,
      name: restaurantName,
      bookings: data.randomInt(0, 50)
    }

    restaurantsData.push(rest);

    if (i % 1000 === 0) {
      await db.none(pgp.helpers.insert(restaurantsData, csRestaurants));
      restaurantsData = [];
    }
    
    if (i % 1000000 === 0) {
      console.log('Restaurants -- ', (new Date() - startTime) / 60000, i);
    }
    
  }
  console.log('Restaurant table seeding Final time in min: ', (new Date() - startTime) / 60000);
}

const createAvailibilites = async (db) => {
  let startTime = new Date();
  let avail = [];
  let id = 0; 

  for (let i = 1; i <= 10000000; i++){ // 10000000
    for (let j = 1; j <= data.randomInt(1, 7); j++){
      id++
      let availibility = {
        id: id,
        restaurant_id: i,
        time_id: data.randomInt(1, 2976)
      };
      avail.push(availibility);
    }

    if (i % 1000 === 0) {
      await db.none(pgp.helpers.insert(avail, csAvailibilites));
      avail = [];
    }

    if (i % 1000000 === 0) {
      console.log('Availibilities -- ', (new Date() - startTime) / 60000, i);
    }

  }

  console.log('Availibility table seeding Final time in min: ', (new Date() - startTime) / 60000);
}

 const seedDB = async () => {
  const db =  await createTable();
  
  await Promise.all([
    createTimeSlots(db),
    createRestaurants(db),
    createAvailibilites(db)
  ]);

  return db;
 }
 
 seedDB()
 .then((db)=>{
  db.none(associateTables);
 })
 .then(()=>{
   console.log('All tables populated');
 });

// for query
//  SELECT  *
//  FROM availibilities JOIN time_slots ON (availibilities.time_id = time_slots.id) 
//  WHERE availibilities.restaurant_id = 100000; 
 