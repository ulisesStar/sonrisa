var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Ubicacion = sequelize.define('Ubicacion', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        nombre: Sequelize.STRING,
        latitude: Sequelize.FLOAT,
        longitude:Sequelize.FLOAT,
        direccion: Sequelize.TEXT,
        periodo: Sequelize.DATE,
        apertura: Sequelize.DATE,
        cierre: Sequelize.DATE
    })

    return Ubicacion;
};

module.exports = ex;
