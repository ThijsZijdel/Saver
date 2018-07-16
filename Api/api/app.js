// Import express package for node.js
const express = require('express');

let bodyParser = require('body-parser');

const http = require('http');

//Create the express application
const app = express();



// TODO optional single import
// let database = require('connection/db.js');
//
// let con = database.connectDatabase();

/**
 * Setup json bodyParser (/reader) for server
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// TODO import
// app.use(expressValidator());
// app.use(cookieParser());


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
// app.use('/db', require('./connection/db.js'));
app.use('/api', require('./controllers/categoriesController'));



// app.use(function(req, res, next){
//     let db = require('connection/db.js');
//
//     req.con = db.connectDatabase;
//     next();
// })



// /**
//  * Catch 404 errors and forward to next handler
//  */
// app.use(function(req, res, next) {
//     let err = new Error('not found');
//     err.status = 404;
//     next(err);
// });
//
// /**
//  * Handle erros
//  */
// app.use(function(err, req, res, next) {
//     // set locals variables ? provide error on dev. mode
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//     // render error page -- optional
//     // req.status(err.status || 500);
//     // res.render('error');
// })


// app.engine('html', require('ejs').renderFile)
// app.set('view engine', 'ejs')


/**
 * Start and listen node.js express server
 */
app.listen(8124, "127.0.0.1");
console.log("Express server listening on port 8124, 127.0.0.1");


