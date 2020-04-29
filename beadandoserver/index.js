const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { mongoose } = require('./database.js');
var studentController = require('./controllers/studentController');
var userController = require('./controllers/userController');

var app = express();
app.use(cors());
app.options('*', cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 });

app.use(bodyParser.json());

app.listen(3000, () => console.log("Node szerver elindult a 3000 porton."));

app.use('/students', studentController);
app.use('/users', userController);