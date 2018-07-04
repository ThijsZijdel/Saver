let mysql      = require('mysql'),
    express    = require('express'),
    router     = express.Router();

let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'SaveSome'
});

// Connect & Catch errors
connection.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql DB connected')
});


router.get('/createDB', (req, res) => {
    let sql = "CREATE DATABASE SaveSome";

    connection.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send('Database created');
    });
});





connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
    if (err){
        throw err
    };
    console.log('The solution is: ', rows[0].solution);
});









connection.end();

module.exports = router;

// module.exports = getConnection();