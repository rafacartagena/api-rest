'use strict'

const port = process.env.PORT || 8888;

const express = require('express');
const app = express();

app.get('/hola/:unNombre', (request, response) => {
    response.send(`Hola a ${request.params.unNombre} desde Express`);
});

app.listen(port, () =>{
    console.log(`API REST ejecutándose en http://localhost:${port}/hola/:tuNombre`);
});