
let express = require('express'),
    router = express.Router(),

    async = require('async'),

    connection = require('../connection/db');


/*
const url = require('url');
const querystring = require('querystring');
let parsedUrl = url.parse("http://127.0.0.1:8124"+req.originalUrl);

querystring.parse(parsedUrl)
console.log(querystring.parse(parsedUrl));
*/

/**
 * Http GET route for expense
 * @param res = all expense
 */
router.get('/expenses' ,  (req, res) => {
    async.parallel(

        [
             (callback) => {
                connection.connectDatabase.query('SELECT * FROM Expense;',
                    (errors, results, fields) => {
                    callback(errors, results);
                })
            }
        ],
        (err, results) => {

            if (err){
                res.statusCode = 400;
                res.json({
                    "Could not get expenses of ":generatedQuery,
                    "queried":req.query,
                    "error":err
                });
            } else {

                //Get the data from the initial call
                let data = results[0];

                res.statusCode = 200;
                res.json(data);
            }
        }
    );

});

router.get('/expenses/get/:month/:year' ,  (req, res) => {
    let generatedQuery = 'SELECT E.* ' +
        'FROM Expense AS E ' +
        'INNER JOIN MonthTab AS M on E.monthFk = M.id '+
        'WHERE E.monthFk = ? AND E.year = ? ';

    if (req.query.orderBy != null ) {
        generatedQuery += 'ORDER BY '+req.query.orderBy;
    }

    generatedQuery += ';';


    async.parallel(
        [
            (callback) => {
                connection.connectDatabase.query(
                    generatedQuery,
                    [req.params.month, req.params.year],
                    (errors, results, fields) => {
                        callback(errors, results);
                    })
            }
        ],
        (err, results) => {
            if (err){
                res.statusCode = 400;
                res.json({
                    "Could not get expenses of ":req.body.month,
                    "body":req.body,
                    "error":err
                });
            } else {

                //Get the data from the initial call
                let data = results[0];


                res.statusCode = 200;
                res.json(data);
            }
        }
    );

});

/**
 * HTTP Post route for expenses
 */
router.post('/expenses' ,  (req, res) => {

    async.parallel(
        [
             (callback) => {


                connection.connectDatabase.query(
                    'INSERT INTO Expense(name, description, amount, repeatingFk, subcategoryFk, date, monthFk, balanceFk, alreadyPaid, companyFk, year) ' +
                    'VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [req.body.name, req.body.description, req.body.amount, req.body.repeatingFk, req.body.subcategoryFk,
                        req.body.sqlDate, req.body.monthFk, req.body.balanceFk, req.body.alreadyPaid, req.body.companyFk, req.body.year],
                     (errors, results, fields) => {

                    callback(errors);
                })
            }
        ],
        (err, results) => {
            if (err){
                res.statusCode = 400;
                res.json({
                            "Could not add expense with name: ":req.body.name,
                            "body":req.body,
                            "sqlDate must been set: ":req.body.sqlDate,
                            "error":err
                });
            } else {
                res.json({"Added expense with name: ": req.body.name});
            }
        }
    );

});

/**
 * HTTP Delete route for expense
 * @param :id of expense
 * @res json confirmation
 */
router.delete('/expenses/delete/:id' ,  (req, res) => {
    async.parallel(
        [
            (callback) => {
                connection.connectDatabase.query(
                    'DELETE FROM Expense WHERE id = ?;', req.params.id,
                     (errors, results) => {
                        callback(errors);
                    })
            }
        ],
        (err, results) => {

            res.json({"Deleted expense with id:":req.params.id});
        }
    );

});

/**
 * HTTP Get route for expense
 * @param :id of expense
 * @res json expense object
 */
router.get('/expenses/get/?:id' ,  (req, res) => {
    async.parallel(
        [
             (callback) => {
                connection.connectDatabase.query('SELECT * FROM Expense WHERE id = '+req.params.id+';',
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
 * HTTP Get route for expense filtered
 * @param query: months => from .. amount of months ago     default: 12 months
 * @param frequency: options => monthly, weekly, daily.     default: monthly
 * @res json expenses objects
 */
router.get('/expenses/filter' ,  (req, res) => {


    let months = 12;
    if (req.query.months != null){
        months = parseInt(req.query.months);
    }
    let fromDate = new Date(),
        from = new Date(fromDate.setMonth(fromDate.getMonth()-months)).toISOString().slice(0,10) ,
        todayDate = new Date(),
        to = todayDate.toISOString().slice(0,10);

    let select = 'SELECT SUM(amount) as amount, monthFk  ',
        fromTbl = 'FROM Expense ',
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

            if (err){
                res.statusCode = 400;
                res.json({
                    "Could not get expenses of ":query,
                    "queried":req.query,
                    "error":err
                });
            } else {

                //Get the data from the initial call
                let data = results[0];

                res.statusCode = 200;
                res.json(data);
            }

        }
    );

});



module.exports = router;