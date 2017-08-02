var db = require('../relations');
var administrador = db.administrador;

var ex = module.exports = {};

ex.create = function (req, res, next) {

    var data = req.body;
    administrador.create(data)
            .then(function (result) {
                res.status(200).jsonp(result);
            });
};

ex.delete = function (req, res, next){
    var id = req.params.id;
    administrador.findById(id)
     .then(function(areas){
        administrador.destroy()
         .then(function(result){
            res.status(200).jsonp(result);
        });
    });
};

ex.update = function(req, res, next){
    var id = req.params.id;
    var data = req.body;
    
    administrador.update(data,{
        where: {
            id: id
        }
    })
    .then(function(result){
        res.status(200).jsonp(result);
    });
};


ex.read = function (req, res, next) {

    var id = req.params.id;

    if (id) {
        administrador.findById(id)
                .then(function (administrador) {
                    res.status(200).jsonp(administrador);
                });
    } else {
        administrador.findAll()
                .then(function (administrador) {
                    res.status(200).jsonp(administrador);
                });
    }
};