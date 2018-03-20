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
});

const Availibility = sequelize.define('availibility', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  restaurantId: Sequelize.INTEGER,
  timeId: Sequelize.INTEGER
});

const Time = sequelize.define('time', {
  day: Sequelize.INTEGER,
  hour: Sequelize.INTEGER,
  min: Sequelize.INTEGER
});


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
    .then(function(){
      Availibility.belongsTo(Restaurant); 
     // Restaurant.hasMany(Availibility);
    })
    .then(function(){
          
      for (let i = 1; i <= 10; i++){
       
        Availibility.create({
          restaurantId: 12,
          timeId: i
        });
      }

    })
    .then(function(){
      Availibility.belongsTo(Time);
      //Availibility.hasOne(Time);
    })
    .then(function(){
      Time.bulkCreate(dataGenerator.availibilitySlots);
    })
}


// seedDB();
   
// Availibility.findAll({
//   where: {
//     restaurantId: 12
//   }
// }).then(item => {
//   //console.log(item);

//   item.forEach( (row) => {
//     //console.log(row.dataValues.timeId);
//     Time.findOne({
//       where: {
//         id: row.dataValues.timeId
//       }
//     }).then((row) => {
//       // console.log(row);
//       console.log(
//         ' day ', row.dataValues.day, 
//         ' hour ', row.dataValues.hour, 
//         ' min ', row.dataValues.min
//       );
//     })
//   })

// })

// Availibility.findAll({
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
