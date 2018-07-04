// Import express package for node.js
const express = require('express');

let bodyParser = require('body-parser');

const http = require('http');

//Create the express application
const app = express();


/**
 * Setup json bodyParser (/reader) for server
 */
app.use(bodyParser.json());



app.use('/min',express.static('../min'));
app.use('/js',express.static('../js'));
app.use('/css',express.static('../css'));
app.use('/img',express.static('../img'));


/**
 * Setup header control
 */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})

// app.use(require('./middlewares'));
app.use('/db', require('./connection/connection.js'));
app.use('/api', require('./controllers/categoriesController'));



/**
 * Start and listen node.js express server
 */
app.listen(8124, "127.0.0.1");
console.log("Express server listening on port 8124, 127.0.0.1");


