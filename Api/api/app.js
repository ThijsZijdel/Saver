// Import express package for node.js
const express = require('express');

let bodyParser = require('body-parser');

// const http = require('http');

let db = require('./connection/db')


/**
 * Create the express application
 */
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
app.use('/api', require('./controllers/categoriesController'));

/**
 * Connect to db an get the routes
 */
app.use('/db', require('./connection/db.js'));






// Connect to MySQL on start
db.connect(db.MODE_PRODUCTION, (err) => {
    if (err) {
        console.log('Unable to create an connection to the database: MySQL.');
        process.exit(1);
    } else {
        //start application
        app.listen(8124, function() {
            console.log("Express server started on port 8124, 127.0.0.1");
        })
    }
});



