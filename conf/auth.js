var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var db = require('../http/relations');
//var usuario = db.usuario;
var administrador = db.administrador;

var auth = function(app) {

    passport.serializeUser(function(user, done) {
        console.log('serializeUser');
        done(null, user);
    });

    passport.deserializeUser(function(id, done) {
        administrador.findOne({ // Using sequelize model functoin
            where: {
                'id': id
            }
        }).then(function(user) {
            if (user == null) {
                done(new Error('Wrong user id.'))
            }

            done(null, user) // Standerd deserailize callback
        })
        console.log('deserializeUser');
    });

    passport.use('local', new localStrategy(function(username, password, done) {
        console.log("LOGEANDO LOCALMENTE");
        administrador.findOne({ // Using sequelize model function
            where: { // Take an object with options where self explanatory
                'username': username
            }
        }).then(function(user) { // Sequelize return a promise with user in callback
            if (user == null) { // Checking if user exsists
                return done(null, false) // Standerd Passport callback
                console.log('no encontro un administrador');
            }

            if (password == user.password) { // use your password hash comparing logic here for security
                return done(null, user) // Standerd Passport callback
            }
            return done(null, false) // Standerd Passport callback
        })
    }))

    // Post request handling route for login
    app.post('/login', passport.authenticate('local', {
        successRedirect: '/admin',
        failureRedirect: '/'
    }))

}

module.exports = auth;
