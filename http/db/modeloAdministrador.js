var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Administrador = sequelize.define('Administrador', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        nombre: Sequelize.STRING,
        password: Sequelize.STRING,
    })

    return Administrador;
};

module.exports = ex;