const express = require('express');
const app = express();
const path = require('path')
const restaurantRouter = require('./restaurantRouter');

app.use(express.static('public'));

app.use('/r', restaurantRouter);

//catch all for invalid endpoints
app.get('*', (req,res)=>{
  res.status(404).sendFile(path.join(__dirname, '../public/404.html'));
});

module.exports = app;