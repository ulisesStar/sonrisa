var db = require('../relations');
var areas = db.areas;

var ex = module.exports = {};

ex.create = function (req, res, next) {

    var data = req.body;
    areas.create(data)
            .then(function (result) {
                res.status(200).jsonp(result);
            });
};

ex.delete = function (req, res, next){
    var id = req.params.id;
    areas.findById(id)
     .then(function(areas){
        areas.destroy()
         .then(function(result){
            res.status(200).jsonp(result);
        });
    });
};

ex.update = function(req, res, next){
    var id = req.params.id;
    var data = req.body;
    
    areas.update(data,{
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
        areas.findById(id)
                .then(function (areas) {
                    res.status(200).jsonp(areas);
                });
    } else {
        areas.findAll()
                .then(function (areas) {
                    res.status(200).jsonp(areas);
                });
    }
};

ex.areasAll = function(req, res, next) {

    areas.findAll().then(function(areas) {
        res.status(200).jsonp(areas);
    });

};