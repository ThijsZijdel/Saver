
let express = require('express'),
    router = express.Router(),

    async = require('async'),

    connection = require('../connection/db');


/**
 * Http GET route for budgets
 * @param req = ?action=getAll
 * @param res = all budgets
 */
router.get('/budgets' ,  (req, res) => {
    async.parallel(
        [
             (callback) => {
                connection.connectDatabase.query('SELECT * FROM Budget;',
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
 * HTTP Post route for budgets
 */
router.post('/budgets' ,  (req, res) => {
    async.parallel(
        [
             (callback) => {
            //todo impliment changes
                connection.connectDatabase.query(

                    'INSERT INTO Budget(idCategory, name, description) VALUES(?,?,?)',
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
 * HTTP Delete route for budget
 * @param :id of budget
 * @res json confirmation
 */
router.delete('/budgets/delete/:id' ,  (req, res) => {
    async.parallel(
        [
            (callback) => {
                connection.connectDatabase.query(
                    'DELETE FROM Budget WHERE id = ?;', req.params.id,
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
 * HTTP Get route for budget
 * @param :id of budget
 * @res json budget object
 */
router.get('/budgets/get/:id' ,  (req, res) => {
    async.parallel(
        [
             (callback) => {
                connection.connectDatabase.query('SELECT * FROM Budget WHERE id = '+req.params.id+';',
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