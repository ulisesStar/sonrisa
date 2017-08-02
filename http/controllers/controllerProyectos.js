var db = require('../relations');
var proyectos = db.proyectos;
var status = db.status;
var pendiente = db.pendiente;
var progreso = db.progreso;
var terminado = db.terminado;
var campanas = db.campanas;

var ex = module.exports = {};

ex.create = function(req, res, next) {

    var data = req.body;
    proyectos.create(data).then(function() {
        res.status(200).jsonp({msj: 'SUCCESS!'});
    });
};


ex.proyectosAll = function(req, res, next) {

    proyectos.findAll().then(function(proyectos) {
        res.status(200).jsonp(proyectos);
    });

};


ex.CrearConStatus = function(req, res, next) {

    var data = req.body;
    proyectos.create(data,{
         include: [
                {
                    model: status,
                    include: [
                        {
                            model: pendiente,
                        },
                        {
                            model: progreso,
                        },
                        {
                            model: terminado,
                        }
                    ],
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                }
            ]
    }).then(function(result) {
        res.status(200).jsonp(result);
    });
};

ex.Proyecto = function(req, res, next) {

    var id = req.params.id;

    if (id) {
        proyectos.findById(id, {
            include: [
                {
                    model: status,
                    include: [
                        {
                            model: pendiente,
                        },
                        {
                            model: progreso,
                        },
                        {
                            model: terminado,
                        }
                    ],
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                }
            ]
        }).then(function(x) {
            res.status(200).jsonp(x);
        });
    } else {
        proyectos.findAll().then(function(x) {
            res.status(200).jsonp(x);
        });
    }
};

ex.delete = function(req, res, next) {
    var id = req.params.id;
    proyectos.findById(id).then(function(proyectos) {
        proyectos.destroy().then(function(result) {
            res.status(200).jsonp(result);
        });
    });
};

ex.update = function(req, res, next) {
    var id = req.params.id;
    var data = req.body;

    proyectos.update(data, {
        where: {
            id: id
        }
    }).then(function(result) {
        res.status(200).jsonp(result);
    });
};

ex.read = function(req, res, next) {

    var id = req.params.id;

    if (id) {
        proyectos.findById(id).then(function(proyecto) {
            res.status(200).jsonp(proyecto);
        });
    } else {
        proyectos.findAll().then(function(proyectos) {
            res.status(200).jsonp(proyectos);
        });
    }
};

ex.ProyectoCampana = function(req, res, next) {
  proyectos.findById(req.params.id, {
      include: [{model: campanas, as: 'campanas'}]
  })
    .then(res.send.bind(res))
    .catch(next);
};