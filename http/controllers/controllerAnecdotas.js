var db = require('../relations');
var anecdotas = db.anecdotas;

var ex = module.exports = {};

ex.create = function (req, res, next) {

    var data = req.body;
    anecdotas.create(data)
            .then(function () {
                res.status(200).jsonp({msj: 'SUCCESS!'});
            });
};

ex.delete = function (req, res, next){
    var id = req.params.id;
    anecdotas.findById(id)
     .then(function(anecdotas){
        anecdotas.destroy()
         .then(function(result){
            res.status(200).jsonp(result);
        });
    });
};

ex.update = function(req, res, next){
    var id = req.params.id;
    var data = req.body;
    
    anecdotas.update(data,{
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
        anecdotas.findById(id)
                .then(function (anecdota) {
                    res.status(200).jsonp(anecdota);
                });
    } else {
        anecdotas.findAll()
                .then(function (anecdota) {
                    res.status(200).jsonp(anecdota);
                });
    }
};