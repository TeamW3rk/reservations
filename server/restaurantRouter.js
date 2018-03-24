const express = require('express');
const app = express();
const router = express.Router();
const reservations = require('./models/reservations');
const bodyParser = require('body-parser');
const url = require('url');

//display widget to all restaurant_id specific endpoints
router.use('/:id', express.static('public'));

//Route requests for specific restaurant availability
router.get('/:id/reservations', (req,res)=>{

  //parse request params from URL
  var requestedTimes = JSON.parse(decodeURIComponent(url.parse(req.url).query));

  //extract day & time from date property
  var day = (new Date(requestedTimes.date)).getUTCDate();
  var time = requestedTimes.time;
  
  var hour = +time.split(':')[0]; //extract hour from time property
  
  reservations.availability(req.params.id, res, (data) => {

    let avail = data.av.split(',');
    var availability = [];

    for (let i = 0; i < avail.length -3; i += 3){
      availability.push({ 
        day : Number(avail[i]),
        hour : Number(avail[i + 1]),
        min : Number(avail[i + 2])
      });
    }

    // console.log(availability);
    var times = availability.filter(table => {
  
      return ((table.day === day) && ((hour+1 >= table.hour) && (table.hour >= hour-1)));

    })
    //send back table availability times
    res.send(times); 
  });
});

//Route requests for specific restaurant bookings count
router.get('/:id/bookings', (req,res) => {

  reservations.availability(req.params.id, res, (data) => {
    let bookingsArray = data.bk.split(',');

    let bookingsInfo = {};
    bookingsInfo.id = data.id;
    bookingsInfo.bookings = [];
    
    for (var i = 0; i < 31; i++){
      bookingsInfo.bookings.push({
        day: (i + 1),
        bookings_count: Number(bookingsArray[i]),
      })
    }

    res.send(bookingsInfo.bookings);
  });
});

app.get('*', (req,res)=>{
  res.status(404).sendFile(path.join(__dirname, '../public/404.html'));
});

module.exports = router;