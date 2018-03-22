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
    console.log('done making timeSlots table')
  })
}

const createRestaurants = async (db) => {
  let startTime = new Date();
  let restaurantsData = []


  for (let i = 1; i <= 1000; i++){
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
      console.log((new Date() - startTime) / 60000, i);
    }
    
  }
  console.log('Restaurant table seeding Final time in min: ', (new Date() - startTime) / 60000);
}

const createAvailibilites = async (db) => {
  let avail = [];
  let id = 0; 

  for (let i = 1; i <= 10000; i++){ // 10000000
    for (let j = 1; j <= 10; j++){
      id++
      let availibility = {
        id: id,
        restaurant_id: i,
        time_id: j
      };
      avail.push(availibility);
    }

    if (i % 1000 === 0) {
      await db.none(pgp.helpers.insert(avail, csAvailibilites));
      avail = [];
    }
  }

  console.log('done');
}

 const seedDB = async () => {
  const db =  await createTable();
  
  await Promise.all([
    createTimeSlots(db),
    createRestaurants(db),
    createAvailibilites(db)
  ]);
 }
 seedDB()
 .then(()=>{
   console.log(' woo hoo!')
 });


