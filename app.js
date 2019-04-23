const {
    VERSION,
} = process.env;

require('app-module-path').addPath(__dirname + '/');

const express = require('express');
const _ = require('underscore');
const app = express();
const logger = require('morgan');

var fs = require('fs');
var morgan = require('morgan');
var path = require('path');
var logDirectory = path.join(__dirname, 'log');

const bodyParser = require('body-parser');
const moment = require('moment-timezone');
const passport = require('passport');


// configure modules
moment.tz.setDefault('Europe/Paris');
process.env.TZ = 'Europe/Paris';


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(passport.initialize());

app.use(function(req, res, next) {

    console.log('ici');
    console.log(req);
    next();
});



// routes
app.use(`/${VERSION}/_health`, require('./routes/health/health'));
app.use(`/_health`, require('./routes/health/health'));


process.on('unhandledRejection', (reason, p) => {
     console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});
process.on('error', function(err) {
    // console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
    console.log("error at line " + err.lineNumber);
});
process.setMaxListeners(0);
process.on('warning', e => console.warn(e.stack));


// error handler
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(err.status || 404);
    res.send({
        message: err.message,
    });
});


module.exports = app;
