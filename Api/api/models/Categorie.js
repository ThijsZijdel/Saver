// let db = require('./../connection/connection');
let connection = require('../connection/db');




// TODO connect from models to connection --> database

// connection.connectDatabase.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
//     if (err){
//         throw err
//     };
//     console.log(rows[0].solution+" huh");
// });


async function getTest() {
    let answer = null;

    await connection.connectDatabase.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
        if (err){
            throw err
        };
        console.log("connected and quered:"+rows[0].solution);
        answer = (rows[0].solution+" huh");

    });

     return answer;
}


module.exports = {
    getTest: getTest()
};




// // Create new categorie in db and return id
// exports.create = function (categorie,)