
let express = require('express'),
    router = express.Router(),

    async = require('async'),

    connection = require('../connection/db');


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


            //Get the data from the initial call
            let data = results[0];


            res.statusCode = 200;
            res.json(data);
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
                    'INSERT INTO Category(idCategory, name, description) VALUES(?,?,?)',
                    [req.body.idCategory, req.body.name, req.body.description],
                     (errors, results, fields) => {

                    callback(errors);
                })
            }
        ],
        (err, results) => {

            res.json({"Added expense with id:":req.body.idCategory});
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
router.get('/expenses/get/:id' ,  (req, res) => {
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
 * HTTP Get route for expense
 * @param :id of expense
 * @res json expense object
 */
router.get('/expenses/monthly' ,  (req, res) => {
    async.parallel(
        [
            (callback) => {
                connection.connectDatabase.query(
                    'SELECT SUM(amount) as amount, monthFk ' +
                    'FROM Expense ' +
                    'WHERE date BETWEEN "2017/07/01" and "2018/07/01" ' +
                    'GROUP BY  monthFk ' +
                    'ORDER BY monthFk;',
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