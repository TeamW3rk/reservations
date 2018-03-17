const Sequelize = require('sequelize');
const dataGenerator = require('./dataGeneratorPostgreSQL');

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

const Availibility = sequelize.define('availibility', {
    restID: Sequelize.INTEGER,
    av: Sequelize.TEXT
  })

  
sequelize
    .sync({force:true})
    .then(function(){

        var populateDatabaseWithRestaurants = async function() {
              var startTime = new Date();
              var availabilityData = [];
            
              for (var i = 1; i <= 10000000; i++) {
                availabilityData.push(dataGenerator.generateRestaurant(i));
            
                if (i % 1000 === 0) {
                  await Availibility.bulkCreate(availabilityData)  
                  availabilityData = [];
                }
            
                if (i % 1000000 === 0) {
                  console.log((new Date() - startTime) / 60000, i);
                }
              } 
              console.log('Final time in min: ', (new Date() - startTime) / 60000);
              process.exit();
            }

            populateDatabaseWithRestaurants();

    })



    


