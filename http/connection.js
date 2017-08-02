var mysql = require('mysql');
var Sequelize = require('sequelize');

var sequelize = new Sequelize('heroku_e7cc23aa455c1a2', 'bbf732cf0b3e76', 'e0b39c44', {
    host: 'us-cdbr-iron-east-03.cleardb.net',
    dialect: 'mysql',
    port: '3306',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});
/*var sequelize = new Sequelize('sonrisa', 'root', '1234', {
    host: '35.192.20.49',
    dialect: 'mysql',
    port: '3306',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

*/ //<----CONEXION A LA BASE DE DATOS DE CLOUD

 /*sequelize.sync()
     .then(function() {
         console.log('Connecion realizada');
     })
     .catch(function(err) {
         console.log('No se puede conectar a la bd:', err);
     }
 );*/

module.exports.Sequelize = Sequelize;
module.exports.sequelize = sequelize;
