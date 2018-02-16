var express = require('express');
var routeObjetivos = express.Router();

var x = require('../controllers/controllerObjetivos');

routeObjetivos.route('/data/objetivos')
    .post(x.create)
    .get(x.read);

routeObjetivos.route('/data/objetivoXproyecto/:id')
    .get(x.objetivosXproyectos);

routeObjetivos.route('/data/objetivos/:id')
    .get(x.read)
    .delete(x.delete)
    .put(x.update);


module.exports = routeObjetivos;
 
 