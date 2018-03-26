const express = require('express');
const app = express();
const path = require('path')
const restaurantRouter = require('./restaurantRouter');

app.use((req, res, next)=> {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//show basic widget on index.html
// app.use(express.static('public'));

app.use('/r', restaurantRouter);

//catch all for invalid endpoints
app.get('*', (req,res) => {
  console.log(req.url);
  res.status(404).sendFile(path.join(__dirname, '../public/404.html'));
});

module.exports = app;

