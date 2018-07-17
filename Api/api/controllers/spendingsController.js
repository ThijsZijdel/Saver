
let express = require('express'),
    router = express.Router(),

    async = require('async'),

    connection = require('../connection/db');


/**
 * Http GET route for spendings
 * @param req = ?action=getAll
 * @param res = all spendings
 */
router.get('/spendings' ,  (req, res) => {
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
 * HTTP Post route for spendings
 */
router.post('/spendings' ,  (req, res) => {
    async.parallel(
        [
             (callback) => {
            //todo impliment changes
                connection.connectDatabase.query(

                    'INSERT INTO Category(idCategory, name, description) VALUES(?,?,?)',
                    [req.body.idCategory, req.body.name, req.body.description],
                     (errors, results, fields) => {

                    callback(errors);
                })
            }
        ],
        (err, results) => {

            res.json({"Added cat with id:":req.body.idCategory});
        }
    );

});

/**
 * HTTP Delete route for category
 * @param :id of category
 * @res json confirmation
 */
router.delete('/spendings/delete/:id' ,  (req, res) => {
    async.parallel(
        [
            (callback) => {
                connection.connectDatabase.query(
                    'DELETE FROM Category WHERE id = ?;', req.params.id,
                     (errors, results) => {
                        callback(errors);
                    })
            }
        ],
        (err, results) => {

            res.json({"Deleted cat with id:":req.params.id});
        }
    );

});

/**
 * HTTP Get route for spendings of month/ year
 * @param :id of spending
 * @res json category object
 */
router.get('/spendings/get/:month/:year' ,  (req, res) => {
    async.parallel(
        [
             (callback) => {
                connection.connectDatabase.query(
                    'SELECT SUM(E.amount) AS Total, C.name, C.description, COUNT(E.name) AS count, M.name as month, M.shortName, C.id ' +
                    'FROM Expense AS E ' +
                    'INNER JOIN Category AS C on E.subcategoryFk = C.subCategoryFk ' +
                    'INNER JOIN MonthTab AS M on E.monthFk = M.id ' +
                    'WHERE E.monthFk = ? AND E.year = ? ' +
                    'GROUP BY C.name ' +
                    'ORDER BY SUM(E.amount)', [req.params.month, req.params.year],
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