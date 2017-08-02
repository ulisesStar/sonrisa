var express = require('express');
var routeUsuarios = express.Router();

var x = require("../controllers/controllerUsuarios");

routeUsuarios.route('/data/usuarios')
        .get(x.read)
        .post(x.create);


routeUsuarios.route('/data/usuarios/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = routeUsuarios;

//REVISAR DONDE SE PONEN LOS PARAMS
//INVESTIGAR LOS CONCEPTOS DE GET,PUT,POST PARA HACER LOS CONTROLADORES
//HACER LAS RELACIONES CORRESPONDIENTES A CADA UNA DE LA TABALAS