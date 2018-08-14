
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
 * HTTP Get route for incomes filtered
 * @param query: months => from .. amount of months ago     default: 12 months
 * @param frequency: options => monthly, weekly, daily.     default: monthly
 * @res json incomes objects
 */
router.get('/incomes/filter' ,  (req, res) => {
    let months = 12;
    if (req.query.months != null){
        months = parseInt(req.query.months);
    }

    let fromDate = new Date(),
        from = new Date( fromDate.setMonth(fromDate.getMonth()-months) ).toISOString().slice(0,10) ,
        todayDate = new Date(),
        to = todayDate.toISOString().slice(0,10);

    let select = 'SELECT SUM(amount) as amount, monthFk  ',
        fromTbl = 'FROM Income ',
        join = ' ',

        where = 'WHERE date BETWEEN "'+from+'" and "'+to+'" ',
        filter= ' ',
        group = 'GROUP BY  monthFk ',
        order = 'ORDER BY monthFk;';

    if (req.query.frequency === "monthly") {
        select = 'SELECT SUM(amount) as amount, monthFk ';
        group = 'GROUP BY  monthFk ';
        order = 'ORDER BY monthFk;';
    } else if (req.query.frequency === "weekly") {
        select = 'SELECT SUM(amount) as amount,  WEEK(date) AS week ';
        group = 'GROUP BY  WEEK(date) ';
        order = 'ORDER BY WEEK(date);'
    } else if (req.query.frequency === "daily"){
        select = 'SELECT SUM(amount) as amount,  date ';
        group =  'GROUP BY  date ';
        order =  'ORDER BY date;';
    }




    let query = select + fromTbl+ join + where + filter + group + order;


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
                connection.connectDatabase.query(

                 'INSERT INTO Income(name, description, amount, repeatingFk, date, monthFk, balanceFk, alreadyPaid, companyFk) ' +
                    'VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [req.body.name, req.body.description, req.body.amount, req.body.repeatingFk, req.body.sqlDate, req.body.monthFk,
                        req.body.balanceFk, req.body.alreadyPaid, req.body.companyFk],
                    (errors, results, fields) => {

                    callback(errors);
                })
            }
        ],
        (err, results) => {
            if (err){
                res.statusCode = 400;
                res.json({
                    "Could not add income with name: ":req.body.name,
                    "body":req.body,
                    "sqlDate must been set: ":req.body.sqlDate,
                    "error":err
                });
            } else {
                res.json({"Added income with name: ": req.body.name});
            }
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