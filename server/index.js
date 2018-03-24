const nr = require('newrelic');

const express = require('express');

const app = require('./app')

const PORT = process.env.PORT || 2003;

app.listen(PORT, ()=> console.log('Listening on Port ', PORT));