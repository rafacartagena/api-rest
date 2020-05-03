'use strict'

// API REST
//  /api/:coleccion/:id

const port = process.env.PORT || 3000;

const express = require('express');
const mongojs = require('mongojs');
const logger = require('morgan');

const cors = require('cors');

//Conectamos con la BD
var db = mongojs("API");
var id = mongojs.ObjectID; //método para convertir un id textual en un objetio mongo

//Creamos la aplicación o servicio Express
const app = express(); 

//Middleware

//## CORS ##
var allowCrossTokenHeader = (req, res, next) => {
    res.header("Access-Control-Allow-Headers", "*");
    return next();
};

var allowCrossTokenOrigin = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    return next();
};

//##########

var auth = (req, res, next) => {
    if(req.headers.token === "password1234") {
        return next();
    } else {
        return next(new Error("No autorizado"));
    };
};


app.use(logger('dev')); //tiny, short, dev, common, combined
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cors());
app.use(allowCrossTokenHeader);
app.use(allowCrossTokenOrigin);

//Añadimos un trigger previo a las rutas para dar soporte a múltiples colecciones
app.param("coleccion", (req, res, next, coleccion) => {
    console.log('param /api/:coleccion'); 
    console.log(`colección: ${coleccion}`); 

    req.collection = db.collection(coleccion);
    return next();
});


//API REST

//Routes
 app.get('/api', (req, res, next) => {
    console.log(req.params);
    console.log(req.collection);

    db.getCollectionNames((err, colecciones) => {
        if (err) return next(err);
        res.json(colecciones);
    });
 }); 
    
app.get('/api/:coleccion', (req, res, next) => {
    req.collection.find((err, coleccion) => {
        if (err) return next(err);
        res.json(coleccion);
    });
});

app.get('/api/:coleccion/:id', (req, res, next) => {
    req.collection.findOne({_id: id(req.params.id)}, (err, item) => {
        if (err) return next(err);
        res.json(item);
    });
});

app.post('/api/:coleccion', auth, (req, res, next) => {
    const elemento = req.body;

    console.log(elemento);

    req.collection.save(elemento, (err, coleccionGuardada) => {
        if (err) return next(err);
        res.json(coleccionGuardada);
    });
});

app.put('/api/:coleccion/:id', auth, (req, res, next) => {
    var elementoID = req.params.id;
    var elementoNuevo = req.body;

    req.collection.update({_id: id(elementoID)}, {$set: elementoNuevo}, {safe: true, multi: false}, (err, elementoModif) => {
        if (err) return next(err);
        res.json(elementoModif);
    });
});

app.delete('/api/:coleccion/:id', auth, (req, res, next) => {
    req.collection.remove({_id: id(req.params.id)}, (err, result) => {
        if (err) return next(err);
        res.json(result);
    });
});

//Iniciamos el servicio CRUD
app.listen(port, () =>{
    console.log(`API REST ejecutándose en http://localhost:${port}/api/:coleccion/:id`);
});
