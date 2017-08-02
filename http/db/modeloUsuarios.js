var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Usuarios = sequelize.define('Usuarios', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        tipo: Sequelize.STRING,
        nombre: Sequelize.STRING,
        apellidos: Sequelize.STRING,
        edad: Sequelize.INTEGER,
        correo: Sequelize.STRING,
    })

    return Usuarios;
};

module.exports = ex;