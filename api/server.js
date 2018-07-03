// Import express package for node.js
const express = require('express');

var bodyParser = require('body-parser');


const http = require('http');


//Create the express application
const app = express();


const categories = [
    { id: 1, name: 'Homes', description: 'home related expenses.', color: "#EB7092", icon:"home", subCategoryFk: 0},
    { id: 2, name: 'Utilities', description: 'Mostly monthly expenses.', color: "#D23556",icon:"cogs", subCategoryFk: 0},
    { id: 3, name: 'Groceries', description: 'Food, drinks.', color: "#FFBB28",icon:"utensils", subCategoryFk: 0},
    { id: 4, name: 'Transportation', description: 'Transportation expenses.', color: "#55BF3B",icon:"car", subCategoryFk: 0},
    { id: 5, name: 'Personal', description: 'Personal expenses.', color: "#444",icon:"user", subCategoryFk: 0},
    { id: 6, name: 'Mobile Phone', description: 'Tele2.', color: "#4BCA81",icon:"phone", subCategoryFk: 2},
    { id: 7, name: 'Clothing', description: 'Clothes.', color: "#8a6fca",icon:"tshirt", subCategoryFk: 0},
    { id: 8, name: 'Festivals', description: 'Parties.', color: "#00AEEF",icon:"gift", subCategoryFk: 5},
    { id: 9, name: 'Insurances', description: 'desc.', color: "#938234",icon:"medkit", subCategoryFk: 0},
    { id: 10, name: 'Scooter costs', description: 'desc.', color: "#eeaaee",icon:"motorcycle", subCategoryFk: 4},
    { id: 11, name: 'Rent', description: 'Home costs.', color: "#FFBB28", icon:"home", subCategoryFk: 1},
    { id: 12, name: 'Study', description: 'desc.', color: "#B8E986",icon:"graduation-cap", subCategoryFk: 0}
];


/**
 * Setup json bodyParser (/reader) for server
 */
app.use(bodyParser.json());



app.use('/min',express.static('../min'));
app.use('/js',express.static('../js'));
app.use('/css',express.static('../css'));
app.use('/img',express.static('../img'));


/**
 * Setup header control
 */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})


/**
 * Http listener for categories
 * @param req = ?action=getAll
 * @param res = all categories
 */
app.get('/categories' , (req, res) => {
    // TODO implement ?action=getAll specific
    res.json(categories);

});

/**
 * Http post categorie
 * note: body is parsed to json
 * @param req = json object: category
 * @param res = status: ok
 */
app.post('/categorie' , (req, res) => {
    categories.push(req.body)
    res.sendStatus(200);

});



/**
 * Start and listen node.js express server
 */
app.listen(8124, "127.0.0.1");
console.log('Server running at http://127.0.0.1:8124/');


