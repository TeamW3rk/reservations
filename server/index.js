const nr = require('newrelic');

const express = require('express');

const app = require('./app')

const PORT = process.env.PORT || 2003;

app.get('*.js', function (req, res, next) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    next();
});

app.listen(PORT, ()=> console.log('Listening on Port ', PORT));