var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Imagenes = sequelize.define('Imagenes', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        imagen: Sequelize.BLOB('medium'),
    })

    return Imagenes;
};

module.exports = ex;