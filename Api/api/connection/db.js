let mysql = require('mysql');
let settings = require('../settings.json');
let db;

function connectDatabase() {
    if (!db) {
        db = mysql.createConnection(settings);

        db.connect((err) => {
            if(!err) {
                console.log('Database is connected!');
            } else {
                console.log('Error connecting database!');
            }
        });
    }
    return db;
}












let
    express    = require('express'),
    router     = express.Router();




// TODO seperate file for: router create + insert dummy data

// router.get('/createDB', (req, res) => {
//     let sql = "CREATE DATABASE SaveSome";
//
//     db.query(sql, (err, result) => {
//         if (err) {
//             throw err;
//         }
//         console.log(result);
//         res.send('Database created');
//     });
// });





// db.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
//     if (err){
//         throw err
//     };
//     console.log('The solution is: ', rows[0].solution);
// });

// db.end();



module.exports = {
    // router,
    connectDatabase: connectDatabase()
};

// module.exports = getConnection();