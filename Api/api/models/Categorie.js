// let db = require('./../connection/connection');

// TODO connect from models to connection --> database


let express    = require('express'),
    router     = express.Router();

// // Create new categorie in db and return id
// exports.create = function (categorie,)




var db = require('./../connection/db.js');

exports.create = (userId, text, done) => {
    var values = [userId, text, new Date().toISOString()];

    db.get().query('INSERT INTO ' +
                   'comments (user_id, text, date) VALUES(?, ?, ?)',
                    values, (err, result) => {
        if (err) {
            return done(err);
        }
        done(null, result.insertId)
    })
};

exports.getAll = (done) =>{
    db.get().query('SELECT * FROM comments',  (err, rows) => {
        if (err) {
            return done(err);
        }
        done(null, rows)
    })
};

exports.getAllByUser = (userId, done) => {
    db.get().query('SELECT * FROM comments WHERE user_id = ?', userId,  (err, rows) => {
        if (err) {
            return done(err);
        }
        done(null, rows)
    })
};


module.exports = router;