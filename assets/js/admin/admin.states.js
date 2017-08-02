app.run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
}]);

app.config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {

	$urlRouterProvider.otherwise('/');
	$stateProvider

	.state('home', {
		url: '/',
		views: {
			'main': {
				templateUrl: '/admin/home'
			}
		}
	})
	.state('proyectos', {
		url: '/proyectos',
		views: {
			'main': {
				templateUrl: '/admin/proyectos'
			}
		}
	})
	.state('proyecto', {
		url: '/proyecto/:idProyecto',
		views: {
			'main': {
				templateUrl: '/admin/infoProyectos',
				controller: function($scope, $stateParams, $rootScope, $http) {
							$scope.proyectos = {};
		                    var idProyecto = $stateParams.idProyecto;
		                    $http.get('/data/proyectos/' + idProyecto ).then(function(data){
		    					$scope.proyectos = data.data;
		                        console.log(data);
		                    });
		                }

			}
		}
	})
	.state('area', {
		url: '/area/:idArea',
		views: {
			'main': {
				templateUrl: '/admin/infoAreas',
				controller: function($scope, $stateParams, $rootScope, $http) {
							$scope.areas = {};
		                    var idArea = $stateParams.idArea;
		                    $http.get('/data/areas/' + idArea ).then(function(data){
		    					$scope.areas = data.data;
		                        console.log(data);
		                    });
		                }

			}
		}
	})
	.state('campana', {
		url: '/campana/:idCampana',
		views: {
			'main': {
				templateUrl: '/admin/infoCampanas',
				controller: function($scope, $stateParams, $rootScope, $http) {
							$scope.campanas = {};
		                    var idCampana = $stateParams.idCampana;
		                    $http.get('/data/campanas/' + idCampana ).then(function(data){
		    					$scope.campanas = data.data;
		                        console.log(data);
		                    });
		                }

			}
		}
	})
	.state('nuevoproyecto', {
		url: '/nuevoproyecto',
		views: {
			'main': {
				templateUrl: '/admin/nuevoproyecto'
			}
		}
	})
	.state('nuevoproyecto.pendiente', {
		url: '/pendiente',
		views: {
			'main': {
				templateUrl: '/admin/status/pendiente'
			}
		}
	})
	.state('nuevoproyecto.progreso', {
		url: '/progreso',
		views: {
			'main': {
				templateUrl: '/admin/status/progreso'
			}
		}
	})
	.state('nuevoproyecto.terminado', {
		url: '/terminado',
		views: {
			'main': {
				templateUrl: '/admin/status/terminado'
			}
		}
	})
	.state('nuevoproyecto.eventoseimagenes', {
		url: '/eventoseimagenes',
		views: {
			'main': {
				templateUrl: '/admin/eventoseimagenes'
			}
		}
	})
    .state('campanas', {
		url: '/campanas',
		views: {
			'main': {
				templateUrl: '/admin/campanas'
			}
		}
	})
    .state('eventos', {
		url: '/eventos',
		views: {
			'main': {
				templateUrl: '/admin/eventos'
			}
		}
	})
    .state('areas', {
		url: '/areas',
		views: {
			'main': {
				templateUrl: '/admin/areas'
			}
		}
	})
     .state('imagenes', {
		url: '/imagenes',
		views: {
			'main': {
				templateUrl: '/admin/imagenes'
			}
		}
	})
}]);
