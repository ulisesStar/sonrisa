var db = require('../relations');
var usuarios = db.usuarios;

var ex = module.exports = {};

ex.create = function (req, res, next) {

    var data = req.body;
    usuarios.create(data)
            .then(function () {
                res.status(200).jsonp({msj: 'SUCCESS!'});
            });
};

ex.delete = function (req, res, next){
    var id = req.params.id;
    usuarios.findById(id)
     .then(function(usuarios){
        usuarios.destroy()
         .then(function(result){
            res.status(200).jsonp(result);
        });
    });
};

ex.update = function(req, res, next){
    var id = req.params.id;
    var data = req.body;
    
    usuarios.update(data,{
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
        usuarios.findById(id)
                .then(function (usuario) {
                    res.status(200).jsonp(usuario);
                });
    } else {
        usuarios.findAll()
                .then(function (usuarios) {
                    res.status(200).jsonp(usuarios);
                });
    }
};