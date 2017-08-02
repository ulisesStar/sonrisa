var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Campana = sequelize.define('Campana', {
      //  id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        nombre: Sequelize.STRING,
        descripcion: Sequelize.STRING,
        fecha: Sequelize.DATE,
    })

    return Campana;
};

module.exports = ex;