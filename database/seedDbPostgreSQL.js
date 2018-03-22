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


const cs = new pgp.helpers.ColumnSet(
  ['id', 'day', 'hour', 'min'],
  {table: 'time_slots'},
  ); 


const createTimeSlots = async (db) => {
  await db.none(pgp.helpers.insert(data.availibilitySlots, cs))
  .then(()=>{
    console.log('done making timeSlots table')
  })
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