let express    = require('express'),
    router     = express.Router();
//
// let connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : 'root',
//     database : 'SaveSome'
// });

// Connect & Catch errors
// connection.connect((err) => {
//     if(err){
//         throw err;
//     }
//     console.log('MySql DB connected')
// });


// router.get('/createDB', (req, res) => {
//     let sql = "CREATE DATABASE SaveSome";
//
//     connection.query(sql, (err, result) => {
//         if (err) {
//             throw err;
//         }
//         console.log(result);
//         res.send('Database created');
//     });
// });





// connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
//     if (err){
//         throw err
//     };
//     console.log('The solution is: ', rows[0].solution);
// });


// connection.end();

// module.exports = router;






let mysql = require('mysql')
    , async = require('async');

let PRODUCTION_DB = 'SaveSome'
    , TEST_DB = 'SaveSomeTest';

exports.MODE_TEST = 'mode_test';
exports.MODE_PRODUCTION = 'mode_production';

let state = {
    pool: null,
    mode: null,
};

exports.connect = (mode, done)  =>{
    state.pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: mode === exports.MODE_PRODUCTION
                        ? PRODUCTION_DB : TEST_DB
    });

    state.mode = mode;
    done()
};

exports.get = function() {
    return state.pool
};

exports.fixtures = (data) => {
    let pool = state.pool;
    if (!pool) return done(new Error('Database connection failed.'));

    let names = Object.keys(data.tables);

    async.each(names, function(name, cb) {
        async.each(data.tables[name], (row, cb) => {
            let keys = Object.keys(row), values = keys.map(
                (key) => {
                    return "'" + row[key] + "'"
                }
            );

            pool.query('INSERT INTO ' + name + ' (' + keys.join(',') + ') VALUES (' + values.join(',') + ')', cb)
        }, cb)
    }, done)
};

exports.drop = (tables, done) => {
    let pool = state.pool;
    if (!pool) return done(new Error('Missing database connection.'));

    async.each(tables, (name, cb) => {
        pool.query('DELETE * FROM ' + name, cb)
    }, done)
};

// state.pool.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
//     if (err){
//         throw err
//     };
//     console.log('The solution is: ', rows[0].solution);
// });




// module.exports;