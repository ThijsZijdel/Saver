let mysql = require('mysql');
let settings = require('../settings.json');
let db;


let
    express    = require('express'),
    router     = express.Router();

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





module.exports = {
    connectDatabase: connectDatabase()
};
