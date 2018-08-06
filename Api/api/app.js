// Import express package for node.js
const express = require('express');

let bodyParser = require('body-parser');

const cors          = require('cors');
const http = require('http');

//Create the express application
const app = express();


/**
 * Setup json bodyParser (/reader) for server
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// TODO import npms
// app.use(expressValidator());
// app.use(cookieParser());

//So other sources can request server
app.use(cors());

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

app.use('/api', require('./controllers/expensesController'));
app.use('/api', require('./controllers/incomesController'));

app.use('/api', require('./controllers/budgetsController'));
app.use('/api', require('./controllers/balancesController'));

app.use('/api', require('./controllers/companiesController'));

app.use('/api', require('./controllers/spendingsController'));


/**
 * Catch 404 errors and forward to next handler
 */
app.use(function(req, res, next) {
    let err = new Error('not found');
    err.status = 404;
    next(err);
});

/**
 * Handle erros
 */
app.use(function(err, req, res, next) {
    // set locals variables ? provide error on dev. mode
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render error page -- optional
    // req.status(err.status || 500);
    // res.render('error');

    res.send(500, {status:500, message: 'internal error', type:'internal'});
});


process.on('unhandledRejection', error => {
    console.error('Uncaught Error', pe(error));
});



// @Deprecated -> only api use: no view engine
// app.engine('html', require('ejs').renderFile)
// app.set('view engine', 'ejs')


/**
 * Start and listen node.js express server
 */
app.listen(8124, "127.0.0.1");
console.log("Express server listening on port 8124, 127.0.0.1");





