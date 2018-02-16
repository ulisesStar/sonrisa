
app.factory('AuthService', function($window, $q, $http, Session, $localStorage, alertas, $state, Usuario, $window) {

    var authService = {};

    authService.registro = function(credentials) {
        $http.post('/data/registro', credentials)
        .success(function(data){
            console.log(data);
			if(data.success === false){
                alertas.mostrarToastEstandar("No se pudo registrar el usuario");
			}else{
                alertas.mostrarToastEstandar("Usuario registrado, procede a logearte");
            }
            //$window.location.href = "/admin";
        })
        .error(function(err){
            alertas.mostrarToastEstandar("No se pudo registrar");
            console.log(err);
        });

    };

    authService.login = function(credentials) {

        var deferred = $q.defer();
        $http.post('/data/login', credentials)
        .success(function(data){
            if(data.token){
                Session.create(data.token);
                //$window.location.href = "/admin";
            }else{
                alertas.mostrarToastEstandar("Usuario o contraseña incorrecta");
            }

            deferred.resolve(data);

        })
        .error(function(data){
            console.log(data);
        })

        return deferred.promise;

    };

    authService.logout = function() {
        Session.destroy();
        $window.location.href = '/';
    };

    authService.update = function(user) {
        return $http.post( '/user/update', user).then(function(resp) {
            if (resp.status === 200) {
                Session.create(resp.data);
            }
            return resp;
        });
    };

    authService.token = function(token) {
        var deferred = $q.defer();
        $http.get('/data/token/' + token).success(function(data) {
            deferred.resolve(data);
            // console.log(data);
            if (data.success === false) {
                alertas.mostrarToastEstandar("No se pudo logear");
            } else {
                alertas.mostrarToastEstandar("Paso el proceso de seguridad");
            }
        }).error(function(data) {
            alertas.mostrarToastEstandar(":(")
        })
        return deferred.promise;
    }

    authService.fb = function(token) {
        var deferred = $q.defer();
        $http.get('/data/token/' + token)
        .success(function(data) {
            deferred.resolve(data);
            // console.log(data);
            if (data.success === false) {
                alertas.mostrarToastEstandar("No se pudo logear");
            } else {
                Session.create(token);
    			$window.location.pathname = '';
            }
        }).error(function(data) {
            alertas.mostrarToastEstandar(":(")
        })
        return deferred.promise;
    }

    authService.obtener = function(id) {
        var deferred = $q.defer();
        $http.get('/data/usuario/' + id).success(function(data) {
            deferred.resolve(data);
            if (data === null) {
                alertas.mostrarToastEstandar("No se pudo obtener el Usuario");
            } else {
                alertas.mostrarToastEstandar("Exito");
            }
        }).error(function(data) {
            alertas.mostrarToastEstandar(":(")
        })

        return deferred.promise;
    }

    return authService;
});


app.service('Session', function($localStorage) {
    this.create = function(data) {
        // $localStorage.accessToken = user.access_token;
        $localStorage.$reset();
        $localStorage.token = data;
        $localStorage.auth = true;

    };

    this.destroy = function() {
        $localStorage.$reset();
    };
});


app.service('Session', function($localStorage) {
    this.create = function(data) {
        // $localStorage.accessToken = user.access_token;
        $localStorage.$reset();
        $localStorage.token = data;
        $localStorage.auth = true;

    };

    this.destroy = function() {
        $localStorage.$reset();
    };
});
