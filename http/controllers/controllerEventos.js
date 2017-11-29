var db = require('../relations');
var eventos = db.eventos;
var proyectos = db.proyectos;
var usuario = db.usuario;

var ex = module.exports = {};

ex.create = function(req, res, next) {

    var data = req.body;
    eventos.create(data).then(function(result) {
        res.status(200).jsonp(result);
    });
};

ex.delete = function(req, res, next) {
    var id = req.params.id;
    eventos.findById(id).then(function(eventos) {
        eventos.destroy().then(function(result) {
            res.status(200).jsonp(result);
        });
    });
};

ex.update = function(req, res, next) {
    var id = req.params.id;
    var data = req.body;

    eventos.update(data, {
        where: {
            id: id
        }
    }).then(function(result) {
        res.status(200).jsonp(result);
    });
};

ex.eventosProyectosStatus = function(req, res, next){

    var idstatus = req.params.IdStatus;
    var idproyecto = req.params.IdProyecto;

    console.log(idstatus);

    if(idstatus == 1){
        var busqueda = {
            where:{
                id_pendiente: idproyecto
            }
        }
    }
    else
        if(idstatus == 2){
            var busqueda = {
                where:{
                    id_progreso: idproyecto
                }
            }
        }
        else
            if(idstatus == 3){
                var busqueda = {
                    where:{
                        id_terminado: idproyecto
                    }
                }
            }


    console.log(busqueda);

    eventos.findAll(busqueda).then(function (eventos) {
        res.status(200).jsonp(eventos);
    });

}

ex.read = function(req, res, next) {

    var id = req.params.id;

    if (id) {
        eventos.findById(id).then(function(evento) {
            res.status(200).jsonp(evento);
        });
    } else {
        eventos.findAll().then(function(eventos) {
            res.status(200).jsonp(eventos);
        });
    }
};


ex.unir = function(req, res, next) {

    var idevento = req.params.IdEvento;
    var idusuario = req.params.IdUsuario;

    eventos.findById(idevento).then(evento => {

        return evento.addUsuario(idusuario);

    })
    .then(res.send.bind(res))

};
