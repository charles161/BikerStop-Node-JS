const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const connection= require("./src/connection/connection.js");
const success = require("./src/helpers/responseHandlers/successHandler")
const error = require("./src/helpers/responseHandlers/errorHandler")
const mongoose = require('mongoose')

connection.connectTodb;


const app = express();
const port = 7070;
// app.use(basicAuth({
//  users: { 'm.charles161@gmail.com': 'Tentacles161' },
//  challenge: true
// }))
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const userRouter = require('./src/routes/user')();
const itemRouter = require('./src/routes/item')();
const orderRouter = require('./src/routes/order')();
app.use('/item', itemRouter);
app.use('/order', orderRouter);
app.use('/user', userRouter);

app.get('/', (req, res) => {
 res.json(success('Welcome to BikerStop'))
});

app.listen(port, () => {
 console.log('Listening on port: ' + port)
});

