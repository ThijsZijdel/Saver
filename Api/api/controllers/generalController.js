

let express = require('express'),
    router = express.Router(),

    async = require('async'),

    connection = require('../connection/db');



/**
 * HTTP Get route for expense filtered
 * @param query: months => from .. amount of months ago     default: 12 months
 * @param frequency: options => monthly, weekly, daily.     default: monthly
 * @res json expenses objects
 */
router.get('/labels' ,  (req, res) => {
    let table, months = 12;
    if (req.query.months != null){
        months = parseInt(req.query.months);
    }

    if (req.query.table != null){
        table = req.query.table;
    }

    let fromDate = new Date(),
        from = new Date(fromDate.setMonth(fromDate.getMonth()-months)).toISOString().slice(0,10) ,
        todayDate = new Date(),
        to = todayDate.toISOString().slice(0,10);

    let select = 'SELECT MonthTab.shortName AS name ',
        fromTbl = 'FROM '+table+' ',
        join = 'INNER JOIN MonthTab on '+table+'.monthFk = MonthTab.id ',

        where = 'WHERE date BETWEEN "'+from+'" and "'+to+'" ',
        filter= ' ',
        group = 'GROUP BY  monthFk ',
        order = 'ORDER BY monthFk;';

    if (req.query.frequency === "monthly") {
        select = 'SELECT MonthTab.shortName as name ';
        group = 'GROUP BY  monthFk ';
        order = 'ORDER BY monthFk;';
    } else if (req.query.frequency === "weekly") {
        select = 'SELECT WEEK(date) AS name ';
        group = 'GROUP BY  WEEK(date) ';
        order = 'ORDER BY WEEK(date);'
    } else if (req.query.frequency === "daily"){
        select = 'SELECT date as name ';
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
            },
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



router.get('/test' ,  (req, res) => {

    async.parallel(
        [
            (callback) => {
                connection.connectDatabase.query( "select * from income where monthFk = 3" ,
                    (errors, results, fields) => {
                        callback(errors, results);
                    })
            },
            (callback) => {
                connection.connectDatabase.query( "select * from expense where monthFk = 2" ,
                    (errors, results, fields) => {
                        callback(errors, results);
                    })
            }
        ],
        (err, results) => {
            //Get the data from the initial call
            let data = results;

            res.statusCode = 200;
            res.json(data);
        }
    );

});



module.exports = router;