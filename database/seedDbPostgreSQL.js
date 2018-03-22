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
  ['id', 'day', 'hour', 'min'],
  {table: 'time_slots'},
); 


const createTimeSlots = async (db) => {
  await db.none(pgp.helpers.insert(data.availibilitySlots, csTime))
  .then(()=>{
    console.log('done making timeSlots table')
  })
}

const createRestaurants = async (db) => {

}

const createAvailibilites = async (db) => {
  
}

 const seedDB = async () => {
  const db =  await createTable();
  
  await Promise.all([
    createTimeSlots(db),
  ]);
 }

 seedDB()
 .then(()=>{
   console.log(' woo hoo!')
 });

