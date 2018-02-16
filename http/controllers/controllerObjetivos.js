var _ = require('lodash');

var db = require('../relations');

var objetivos = db.objetivo;
var proyectos = db.proyectos;

var ex = module.exports = {};

ex.create = function (req, res, next){
    var data = req.body;

    objetivos.create(data).then(result => {
        res.status(200).jsonp(result);
    });
}

ex.read =  function(req, res, next) {
    var id = req.params.id;

    if(id){
        objetivos.findById(id).then(result => {
            res.status(200).jsonp(result);
        });
    }else {
        objetivos.findAll().then(result => {
            res.status(200).jsonp(result);
        });
    }
}

ex.objetivosXproyectos = function(req, res, next) {
    var idProyecto = req.params.id;

    objetivos.findAll({
        where: {
            id_proyecto : idProyecto
        },
    }).then(result => {
        res.status(200).jsonp(result);
    });
}

ex.update = function (req, res, next) {
    var id = req.params.id;
    var data = req.body;

    objetivos.update(data, {
        where: {
            id : id
        },
    }).then(result => {
        res.status(200).jsonp({msj: 'SUCCESS!'});
    });
}

ex.delete = function(req, res, next) {
    var id = req.params.id;

    objetivos.findById(id).then(objetivo => {
        objetivo.destroy().then(result => {
            res.status(200).jsonp(result);
        });
    });
}