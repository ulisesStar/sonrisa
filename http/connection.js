var mysql = require('mysql');
var Sequelize = require('sequelize');

/* var sequelize = new Sequelize('sonrisa', 'root', 'root', {
    host: '104.154.230.192',
    dialect: 'mysql',
    port: '4306',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
}); */

var sequelize = new Sequelize('sonrisas', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql',
    port: '3306',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

//<----CONEXION A LA BASE DE DATOS DE CLOUD

sequelize.sync()
      .then(function() {
          console.log('Connecion realizada');
      })
      .catch(function(err) {
          console.log('No se puede conectar a la bd:', err);
      }
  );

module.exports.Sequelize = Sequelize;
module.exports.sequelize = sequelize;
