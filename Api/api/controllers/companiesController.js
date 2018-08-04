
let express = require('express'),
    router = express.Router(),

    async = require('async'),

    connection = require('../connection/db');


/**
 * Http GET route for budgets
 * @param req = ?action=getAll
 * @param res = all budgets
 */
router.get('/companies' ,  (req, res) => {
    async.parallel(
        [
            (callback) => {
                connection.connectDatabase.query('SELECT * FROM Company;',
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
router.post('/companies' ,  (req, res) => {
    async.parallel(
        [
            (callback) => {
                connection.connectDatabase.query(
                    'INSERT INTO Company(name, description, website, telephone, email, categoryFk, iban, transactionName) ' +
                        'VALUES( ?, ?, ?, ?, ?, ?, ?, ?)',
                    [req.body.name, req.body.description, req.body.website, req.body.telephone, req.body.email, req.body.categoryFk, req.body.iban, req.body.transactionName ],
                    (errors, results, fields) => {
                        callback(errors);
                    })
            }
        ],
        (err, results) => {
            if (err){
                res.statusCode = 400;
                res.json({"Something went wrong when uploading:":req.body.name});
            }
            res.json({"Added company with name:":req.body.name});
        }
    );

});

/**
 * HTTP Delete route for budget
 * @param :id of budget
 * @res json confirmation
 */
router.delete('/companies/delete/:id' ,  (req, res) => {
    async.parallel(
        [
            (callback) => {
                connection.connectDatabase.query(
                    'DELETE FROM Company WHERE id = ?;', req.params.id,
                    (errors, results) => {
                        callback(errors);
                    })
            }
        ],
        (err, results) => {

            res.json({"Deleted company with id:":req.params.id});
        }
    );

});

/**
 * HTTP Get route for budget
 * @param :id of budget
 * @res json budget object
 */
router.get('/companies/get/:id' ,  (req, res) => {
    async.parallel(
        [
            (callback) => {
                connection.connectDatabase.query('SELECT * FROM Company WHERE id = '+req.params.id+';',
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