var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Anecdotas = sequelize.define('Anecdotas', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        descripcion: Sequelize.STRING,
    })

    return Anecdotas;
};

module.exports = ex;