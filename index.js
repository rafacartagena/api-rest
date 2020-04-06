'use strict'

const port = process.env.PORT || 3000;

const express = require('express');
const logger = require('morgan');

const app = express();

//Middleware
app.use(logger('dev')); //tiny, short, dev, common, combined
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//API REST
app.get('/api/product', (req, res) => {
    res.status(200).send({'lista de productos':[]});
});

app.get('/api/product/:productID', (req, res) => {
    res.status(200).send({producto: `${req.params.productID}`});
});

app.post('/api/product', (req, res) => {
    console.log(req.body);
    // Crearía el nuevo objeto
    res.status(200).send({producto: 'El producto se ha creado'});
});

app.put('/api/product:productID', (req, res) => {
    console.log(req.body);
    // Crearía el nuevo objeto
    res.status(200).send({producto: 'El producto se ha creado'});
});

app.listen(port, () =>{
    console.log(`API REST ejecutándose en http://localhost:${port}/api/product`);
});