
let express = require('express'),
    router = express.Router(),

    async = require('async'),

    connection = require('../connection/db');


/**
 * Http GET route for incomes
 * @param req = ?action=getAll
 * @param res = all incomes
 */
router.get('/incomes' ,  (req, res) => {
    async.parallel(
        [
             (callback) => {
                connection.connectDatabase.query('SELECT * FROM Income;',
                    (errors, results, fields) => {
                    callback(errors, results);
                })
            }
        ],
        (err, results) => {


            //Get the data from the initial call
            let data = results[0];


            res.statusCode = 200;
            res.json(data);
        }
    );

});

/**
 * HTTP Get route for expense
 * @param :id of expense
 * @res json expense object
 */
router.get('/incomes/?:frequency/?:months' ,  (req, res) => {
    let query, where = 'date BETWEEN "2017/07/01" and "2018/07/01"';

    if (req.params.months === 12)
        where = 'date BETWEEN "2017/07/01" and "2018/07/01"';
    if (req.params.months === 6)
        where = 'date BETWEEN "2018/02/01" and "2018/07/01"';



    if (req.params.frequency === "monthly") {
        query = 'SELECT SUM(amount) as amount, monthFk ' +
            'FROM Income ' +
            'WHERE '+where+' ' +
            'GROUP BY  monthFk ' +
            'ORDER BY monthFk;'
    } else if (req.params.frequency === "weekly") {
        query = 'SELECT SUM(amount) as amount,  WEEK(date) AS week ' +
            'FROM Income ' +
            'WHERE '+where+' ' +
            'GROUP BY  WEEK(date) ' +
            'ORDER BY WEEK(date);'
    } else if (req.params.frequency === "daily"){
        query = 'SELECT SUM(amount) as amount,  date ' +
            'FROM Income ' +
            'WHERE '+where+' ' +
            'GROUP BY  date ' +
            'ORDER BY date;'
    }

    async.parallel(
        [
            (callback) => {
                connection.connectDatabase.query( query ,
                    (errors, results, fields) => {
                        callback(errors, results);
                    })
            }
        ],
        (err, results) => {
            //Get the data from the initial call
            let data = results[0];

            res.statusCode = 200;
            res.json(data);
        }
    );

});

/**
 * HTTP Post route for incomes
 */
router.post('/incomes' ,  (req, res) => {
    async.parallel(
        [
             (callback) => {
            //todo impliment changes
                connection.connectDatabase.query(

                    'INSERT INTO Income(idCategory, name, description) VALUES(?,?,?)',
                    [req.body.idCategory, req.body.name, req.body.description],
                     (errors, results, fields) => {

                    callback(errors);
                })
            }
        ],
        (err, results) => {

            res.json({"Added income with id:":req.body.idCategory});
        }
    );

});

/**
 * HTTP Delete route for income
 * @param :id of income
 * @res json confirmation
 */
router.delete('/incomes/delete/:id' ,  (req, res) => {
    async.parallel(
        [
            (callback) => {
                connection.connectDatabase.query(
                    'DELETE FROM Income WHERE id = ?;', req.params.id,
                     (errors, results) => {
                        callback(errors);
                    })
            }
        ],
        (err, results) => {

            res.json({"Deleted income with id:":req.params.id});
        }
    );

});

/**
 * HTTP Get route for income
 * @param :id of income
 * @res json income object
 */
router.get('/incomes/get/:id' ,  (req, res) => {
    async.parallel(
        [
             (callback) => {
                connection.connectDatabase.query('SELECT * FROM Income WHERE id = '+req.params.id+';',
                    (errors, results, fields) => {
                    callback(errors, results);
                })
            }
        ],
        (err, results) => {
            //Get the data from the initial call
            let data = results[0];

            res.statusCode = 200;
            res.json(data);
        }
    );

});






module.exports = router;