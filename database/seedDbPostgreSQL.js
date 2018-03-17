const Sequelize = require('sequelize');
const sequelize = new Sequelize('reservations', 'kylechambers', 'password', {
  host: 'localhost',
  dialect: 'postgres'
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
    id: Sequelize.INTEGER,
    av: Sequelize.STRING
  })
  
sequalize
    .sync({force:true})
    .then(function(){

        

        Availibility.create({
            id: 'title here',
            av: 'another thing'
        })
    })



    