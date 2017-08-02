var express = require('express');
var routeProyectos = express.Router();

var x = require("../controllers/controllerProyectos");

routeProyectos.route('/data/proyectos')
        .get(x.read)
        .post(x.create);

routeProyectos.route('/data/CrearProyecto')
        .post(x.CrearConStatus);

routeProyectos.route('/data/proyectosAll')
		.get(x.proyectosAll);

routeProyectos.route('/data/ProyectosCampana/:id')
        .get(x.ProyectoCampana);

routeProyectos.route('/data/ProyectoStatus/:id')
        .get(x.Proyecto);

routeProyectos.route('/data/proyectos/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = routeProyectos;

