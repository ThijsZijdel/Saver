
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