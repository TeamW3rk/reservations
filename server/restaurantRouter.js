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

    var availability = data.availability;
    var times = availability.filter(table => {
  
      return ((table.day === day) && ((hour+1 >= table.hour) && (table.hour >= hour-1)));

    })
    //send back table availability times
    res.send(times); 
  });
});

//Route requests for specific restaurant bookings count
router.get('/:id/bookings', (req,res)=>{

  reservations.bookings(req.params.id, res, (data)=>{
    //send back booking times
    res.send(data.bookings);
  });
});

app.get('*', (req,res)=>{
  res.status(404).sendFile(path.join(__dirname, '../public/404.html'));
});



module.exports = router;