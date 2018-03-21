const Sequelize = require('sequelize');
const dataGenerator = require('./dataGeneratorPostgreSQL2');


const sequelize = new Sequelize('reservations', 'kylechambers', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  logging: console.log,
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

const Time = sequelize.define('time', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  day: Sequelize.INTEGER,
  hour: Sequelize.INTEGER,
  min: Sequelize.INTEGER
});


const Availibilities = sequelize.define('availibilities', {
  identifier: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

//   // restaurantId: {
//   //   type: Sequelize.INTEGER,
//   //   references: {
//   //     model: Restaurant,
//   //     key: 'id'
//   //   },
//   // },
  
//   // timeId: {
//   //   type: Sequelize.INTEGER,
//   //   references: {
//   //     model: Time,
//   //     key: 'id'
//   //   },
//   // }
})

Restaurant.belongsToMany(Time, {through: Availibilities, foreignKey: 'restaurantId'});
Time.belongsToMany(Restaurant, {through: Availibilities, foreignKey: 'timeId'});


function seedDB(){
  sequelize
    .sync(
       {force:true}
    )
    .then(function(){
      
      var arrayOfPromises = []
      for (let i = 1; i <= 100; i++){
        let restaurantName = dataGenerator.generateRestaurantName();

        arrayOfPromises.push(Restaurant.create({
          id: i,
          name: restaurantName,
          numBookings: 11
        }));

      }
      return Promise.all(arrayOfPromises)
    })
    .then(function(){
      return Time.bulkCreate(dataGenerator.availibilitySlots);
    })
    .then(function(){

      let populateJoinTable = function(){

        let avail = [];

        for (let i = 1; i <= 100; i++){
          let availibility = {
            restaurantId: i,
            timeId: 2
          };
          avail.push(availibility);
        }

        Availibilities.bulkCreate(avail)
      }
      populateJoinTable();

    })

///////////////////////

    // .then(function(){
    //   Availibilities.create({
    //     restaurantId: 1,
    //     timeId: 2
    //   }) 
    // })
    // .then(function(){
    //   Availibilities.create({
    //     restaurantId: 1,
    //     timeId: 4
    //   }) 
    // })
    // .then(function(){
    //   Availibilities.create({
    //     restaurantId: 1,
    //     timeId: 12
    //   }) 
    // })
    // .then(function(){
    //   Availibilities.create({
    //     restaurantId: 2,
    //     timeId: 2
    //   }) 
    // })
    // .then(function(){
    //   Availibilities.create({
    //     restaurantId: 2,
    //     timeId: 4
    //   }) 
    // })
    // .then(function(){
    //   Availibilities.create({
    //     restaurantId: 2,
    //     timeId: 6
    //   }) 
    // })
    // .then(function(){
    //   console.log('seeded db')
    // })
    // .catch(function(err) {

    //     console.log(err);
    // });

   
}

// seedDB();
   


// sequelize
//   .sync()
//   .then(function(){

//   })

// Availibilities.find({
//   logger: console.log,
//   where: {id : 1}
// })
// .then(() => {
//   console.log(item);
// })



Availibilities.findAll({
  where: {
    restaurantId: 1
  },
  include: [{
    where: {
      timeId: "time.id"
    },
    model: Time
  }]
})
// .then(item => {
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



// Availibilities.findAll({
//   where: {
//     restaurantId: 1
//   }
// })
// .then(item => {
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
