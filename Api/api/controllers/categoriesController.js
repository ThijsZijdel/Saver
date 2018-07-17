
let express = require('express'),
    router = express.Router(),

    async = require('async'),

    connection = require('../connection/db');


/**
 * Http GET route for categories
 * @param req = ?action=getAll
 * @param res = all categories
 */
router.get('/categories' ,  (req, res) => {
    async.parallel(
        [
             (callback) => {
                connection.connectDatabase.query('SELECT * FROM Category;',
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
 * HTTP Post route for categories
 */
router.post('/categories' ,  (req, res) => {
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
router.delete('/categories/delete/:id' ,  (req, res) => {
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
 * HTTP Get route for category
 * @param :id of category
 * @res json category object
 */
router.get('/categories/get/:id' ,  (req, res) => {
    async.parallel(
        [
             (callback) => {
                connection.connectDatabase.query('SELECT * FROM Category WHERE id = '+req.params.id+';',
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