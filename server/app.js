// Purpose of file: To initialize Express and create basic endpoints

const express = require('express'); // Loading in Express functionality
const bodyParser = require('body-parser');
const apiRouter = require('./api'); // Loading in our custom index.js from /api (it will automatically look for index.js)
const app = express(); // Creating an Express instance
//app.use(express.static(path.join(__dirname, 'public')));

const path = require('path');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', apiRouter);

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.use('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
    next();
});

// app.get('*', function logGetRequests(req, res, next) {
//     console.log('someone made a request with GET method');
//     next();
// });

//app.get('/api', apiRouter);

// app.get('/', function(req, res) {
//     res.send('index page, triggered by GET /');
// });

module.exports = app;
