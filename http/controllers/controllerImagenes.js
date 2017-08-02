var db = require('../relations');
var imagenes = db.imagenes;
var proyectos = db.proyectos;

var ex = module.exports = {};

ex.create = function (req, res, next) {

    var data = req.body;
    imagenes.create(data)
            .then(function () {
                res.status(200).jsonp(data);
    });
};

ex.ImagenProyecto = function(req, res, next){

    var data = req.body.imagen;
    var IdPendiente = req.params.IdPendiente;
    var IdProgreso = req.params.IdProgreso;
    var IdTerminado = req.params.IdTerminado;

    imagenes.create({
        imagen: data,
        id_pendiente: IdPendiente,
        id_progreso: IdProgreso,
        id_Terminado: IdTerminado,
    }).then(function (result) {
        res.status(200).jsonp(result);
    });
};

ex.delete = function (req, res, next){
    var id = req.params.id;
    imagenes.findById(id)
     .then(function(imagenes){
        imagenes.destroy()
         .then(function(result){
            res.status(200).jsonp(result);
        });
    });
};

ex.update = function(req, res, next){
    var id = req.params.id;
    var data = req.body;

    imagenes.update(data,{
        where: {
            id: id
        }
    })
    .then(function(result){
        res.status(200).jsonp({msj: 'SUCCESS!'});
    });
};


ex.read = function (req, res, next) {

    var id = req.params.id;

    if (id) {
        imagenes.findById(id)
                .then(function (imagen) {
                    res.status(200).jsonp(imagen);
                });
    } else {
        imagenes.findAll()
                .then(function (imagenes) {
                    res.status(200).jsonp(imagenes);
                });
    }
};
