var express = require('express');
var routeAdministrador = express.Router();

var x = require("../controllers/controllerAdministrador");

routeAdministrador.route('/data/administrador')
        .get(x.read)
        .post(x.create);

routeAdministrador.route('/data/administrador/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = routeAdministrador;