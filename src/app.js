'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');

const app = express();
const router = express.Router();

//Banco de Dados
const mongoose = require('mongoose');
mongoose.connect(config.connectionString, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, })
    .then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log(`DB Connection Error: ${err.message}`);
    });

//Models
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

//Rotas
const indexRoute = require('./routes/index.route');
const productRoute = require('./routes/product.route');
const customerRoute = require('./routes/customer.route');
const orderRoute = require('./routes/order.route');

app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({ extended: false }));

// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', indexRoute);
app.use('/product', productRoute);
app.use('/customer', customerRoute);
app.use('/order', orderRoute);

// Manipulação de exceptions
app.use(exceptionHandler);
function exceptionHandler(err, req, res, next) {
    console.error({Date : new Date(), Error: err});
    //TODO: logar dados do err/req no banco, enviar email e etc...
    res.status(500).send("Ops! Algo deu errado!");
}

module.exports = app;
