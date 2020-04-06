'use strict'

const port = process.env.PORT || 3000;

const express = require('express');
const app = express();

app.get('/hola/:unNombre', (request, response) => {
    // response.send(`Hola a ${request.params.unNombre} desde Express`);
    response.status(200).send({mensaje:`Hola ${request.params.unNombre} desde API con JSON`});
});

app.listen(port, () =>{
    console.log(`API REST ejecutándose en http://localhost:${port}/hola/:tuNombre`);
});