var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Objetivos = sequelize.define('Objetivo', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        objetivo: Sequelize.STRING,
        status: {
            type: Sequelize.ENUM,
            values: ['false', 'true'],
            defaultValue: 'false',
        }
    })

    return Objetivos;
};

module.exports = ex;