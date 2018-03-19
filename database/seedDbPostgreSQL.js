const Sequelize = require('sequelize');
const dataGenerator = require('./dataGeneratorPostgreSQL2');

const sequelize = new Sequelize('reservations', 'kylechambers', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
//   pool: {
//     max: 9,
//     min: 0,
//     idle: 10000
//   }
});

sequelize.authenticate().then(() => {
  console.log("Success!");
}).catch((err) => {
  console.log(err);
});

const Restaurant = sequelize.define('restaurant', {
  id: { 
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  numBookings: Sequelize.INTEGER,
  av: Sequelize.INTEGER
});

const Availibility = sequelize.define('availibility', {
  restaurant_id: Sequelize.INTEGER,
  time_id: Sequelize.INTEGER
});

const Time = sequelize.define('time', {
  day: Sequelize.INTEGER,
  hour: Sequelize.INTEGER,
  min: Sequelize.INTEGER
});


// console.log(dataGenerator.availibilitySlots);
sequelize
    .sync({force:true})
    .then(function(){

      Time.bulkCreate(dataGenerator.availibilitySlots);
      
      // Restaurant.hasMany(Availibility, {foreignKey: 'restaurant_id', sourceKey: 'id'});
      // Availibility.belongsTo(Restaurant, {foreignKey: 'restaurant_id', targetKey: 'id'});

      // Availibility.create({

      // });
    })

// sequelize
//     .sync({force:true})
//     .then(function(){
//         var populateDatabaseWithRestaurants = async function() {
//               var startTime = new Date();
//               var availabilityData = [];
            
//               for (var i = 1; i <= 10000000; i++) {
//                 availabilityData.push(dataGenerator.generateRestaurant(i));
            
//                 if (i % 1000 === 0) {
//                   await Availibility.bulkCreate(availabilityData);  
//                   availabilityData = [];
//                 }
            
//                 if (i % 1000000 === 0) {
//                   console.log((new Date() - startTime) / 60000, i);
//                 }
//               } 
//               console.log('Final time in min: ', (new Date() - startTime) / 60000);
//               process.exit();
//             }

//             populateDatabaseWithRestaurants();

//     })



    


// const City = sequelize.define('city', { countryCode: Sequelize.STRING });
// const Country = sequelize.define('country', { isoCode: Sequelize.STRING });

// // Here we can connect countries and cities base on country code

// Country.hasMany(City, {foreignKey: 'countryCode', sourceKey: 'isoCode'});
// City.belongsTo(Country, {foreignKey: 'countryCode', targetKey: 'isoCode'});

// City.create({countryCode: 'something'})
// Country.create({ isoCode: 'something'})