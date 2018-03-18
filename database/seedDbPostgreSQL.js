const Sequelize = require('sequelize');
const dataGenerator = require('./dataGeneratorPostgreSQL');

const sequelize = new Sequelize('reservations2test', 'kylechambers', 'password', {
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

// const City = sequelize.define('city', { countryCode: Sequelize.STRING });
// const Country = sequelize.define('country', { isoCode: Sequelize.STRING });

// // Here we can connect countries and cities base on country code
// Country.hasMany(City, {foreignKey: 'countryCode', sourceKey: 'isoCode'});
// City.belongsTo(Country, {foreignKey: 'countryCode', targetKey: 'isoCode'});



Task.create({ title: 'foo', description: 'bar', deadline: new Date() }).then(task => {
  // you can now access the newly created task via the variable task
})

const Availibility = sequelize.define('availibility', {
  day: Sequelize.INTEGER,
  hour: Sequelize.INTEGER,
  min: Sequelize.INTEGER
  // restID: Sequelize.INTEGER,
  // av: Sequelize.TEXT
})

const Restaurant = sequelize.define('restaurant', {GIT
  
});

Restaurnt.hasMany(Availibility, {foreignKey: '', sourceKey: ''});
Availibility.belongsTo(Restaurant, {foreignKey: '', targetKey: ''});
 
sequelize
    .sync({force:true})
    .then(function(){
      Availibility.create({

      });
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



    


