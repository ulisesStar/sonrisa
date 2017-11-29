var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Avatar = sequelize.define('avatar', {
        fb_avatar: Sequelize.INTEGER
    })

    return Avatar;
};

module.exports = ex;
