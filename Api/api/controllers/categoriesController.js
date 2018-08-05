
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
 * Http GET route for categories
 * @param req = ?action=getAll
 * @param res = all categories
 */
router.get('/categories/get/main' ,  (req, res) => {
    async.parallel(
        [
            (callback) => {
                connection.connectDatabase.query('SELECT * FROM Category WHERE Category.subcategoryFk = 0;',
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
 * HTTP Put route for category
 * @param :id of category
 * @res json confirmation
 */
router.put('/categories/edit/' ,  (req, res) => {
    async.parallel(
        [
            (callback) => {
                connection.connectDatabase.query(
                    'UPDATE Category SET name = ?, description= ?, color = ?, icon = ?, subCategoryFk= ? WHERE id = ?;',

                    [req.body.name, req.body.description, req.body.color, req.body.icon, req.body.subCategoryFk, req.body.id],
                    (errors, results) => {
                        callback(errors);
                    })
            }
        ],
        (err, results) => {

            res.json({"Edited cat with id:":req.params.id});


        }
    );

});

router.get('/categories/get/:month/:year/:filter' ,  (req, res) => {
    let generatedQuery;

    if(req.params.filter === "onlyMain") {
        generatedQuery =
            'SELECT DISTINCT SUM(Expense.amount) AS total, mainCat.* FROM Expense ' +
            'LEFT JOIN Category ON Expense.subcategoryFk = Category.id ' +
            'LEFT JOIN Category AS mainCat ON Category.subCategoryFk = mainCat.id ' +
            'WHERE Expense.monthFk = ? AND Expense.year = ?  ' +
            'GROUP BY mainCat.id ' +
            'ORDER BY mainCat.id;';
    }

    if (req.params.filter === "all" ){
       generatedQuery =
            'SELECT DISTINCT Category.*, SUM(Expense.amount) as total FROM Expense ' +
            'LEFT JOIN Category ON Expense.subcategoryFk = Category.id ' +
            'WHERE Expense.monthFk = ? AND Expense.year = ?  ' +
            'GROUP BY Category.id ' +
            'ORDER BY Category.id, Category.subCategoryFk; ';
    }
    async.parallel(
        [
            (callback) => {
                connection.connectDatabase.query(generatedQuery,
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
                    "Could not get categories from expenses of month: ":req.params.month,
                    "params":req.params,
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
 * HTTP Post route for categories
 */
router.post('/categories' ,  (req, res) => {
    async.parallel(
        [
            (callback) => {
                connection.connectDatabase.query(
                    'INSERT INTO Category(name, description, color, icon, subCategoryFk) VALUES(?,?,?,?,?)',
                    [req.body.name, req.body.description, req.body.color, req.body.icon, req.body.subCategoryFk],
                    (errors, results, fields) => {

                        callback(errors);
                    })
            }
        ],
        (err, results) => {
            if (err){
                res.json({"Something went wrong when uploading:":req.body.name});
            } else {
                res.json({"Added category:": req.body.name});
            }
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