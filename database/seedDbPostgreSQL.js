const Sequelize = require('sequelize');
const dataGenerator = require('./dataGeneratorPostgreSQL2');


const sequelize = new Sequelize('reservations', 'kylechambers', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  define: {
    timestamps: false // true by default
  },
  pool: {
    max: 9,
    min: 0,
    idle: 10000
  }
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
}
// ,{
//   associate: function(models){
//     models.Restaurant.belongsToMany(Time, {through: 'Availibility'})
//   }
// }
);

const Time = sequelize.define('time', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  day: Sequelize.INTEGER,
  hour: Sequelize.INTEGER,
  min: Sequelize.INTEGER
}
// ,{
//   associate: function(models){
//     models.Time.belongsToMany(Restaurant, {through: 'Availibility'})
//   }
// }
);

// Restaurant.associate = (models) => {
//   Restaurant.belongsToMany(models.Time, {
//     through: 'Availibility'
//   });
// };

// Time.associate = (models) => {
//   Time.belongsToMany(models.Availibility, {
//     through: 'Time'
//   });
// };


Restaurant.belongsToMany(Time, {through: 'Availibility'});
Time.belongsToMany(Restaurant, {through: 'Availibility'});

// console.log(dataGenerator.availibilitySlots);
function seedDB(){
  sequelize
    .sync({force:true})
    .then(function(){
      
      for (let i = 1; i <= 10; i++){
        let restaurantName = dataGenerator.generateRestaurantName();

        Restaurant.create({
          id: i,
          name: restaurantName,
          numBookings: 11
        });
      }

    })

    // .then(function(){
    //   Restaurant.belongsToMany(Time, {through: 'Availibility'});
    //   Time.belongsToMany(Restaurant, {through: 'Availibility'});
    // })

    .then(function(){
      Time.bulkCreate(dataGenerator.availibilitySlots);
    })


}

seedDB();
   



// Availibility.findAll({
//   where: {
//     restaurantId: 12
//   },
//   include: [{
//     model: Time,
//     where: {
//       timeId: Sequelize.col('availibility.timeId')
//     }
//   }]
// }).then(item => {
//   console.log(item);
// })


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
