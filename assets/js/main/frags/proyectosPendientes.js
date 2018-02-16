var app = angular.module('myapp');

app.controller('proyectosPendientesCtrl', function($interval, $scope, $state, $stateParams, $rootScope, $http, $mdDialog, $localStorage, ProyectosPendientes, Evento, Imagen, Aportaciones, Material, Usuario, Anecdota, Ubicacion, Objetivos, AuthService) {

	$scope.loaderProyectoPendiente = true;
    if ($stateParams.proyecto === null) {
        $state.go('proyectos.vista1')
    } else {

        var id = $stateParams.proyecto;
        var status = 1;

        if ($scope.usuario === undefined) {
            AuthService.token($localStorage.token).then(data => {
                $scope.usuario = data.user;
            })
        }

        $scope.map = {
            center: {
                latitude: 19.1847524,
                longitude: -96.1550328
            },
            zoom: 11
        };

        $scope.markers = [];

        ProyectosPendientes.obtener(id).then(res =>  {


            $scope.proyecto = res.data;
            $scope.loaderProyectoPendiente = false;
            $scope.$digest()

            return res.data.id

        }).then(id => {
            
            Imagen.obtenerPortada(id).then(res => {
                $scope.portada = res.data;
            })

            Imagen.obtener(id).then(res => {
                $scope.imagenes = res.data;
                $scope.$digest();
            })

            Ubicacion.obtenerConProyecto(id).then(res => {
                $scope.ubicaciones = res.data;
                return res.data
            }).then(result => {
                _.map(result, function(n) {
                    $scope.markers.push({latitude: n.latitude, longitude: n.longitude});
                })
            })

            Objetivos.obtenerAll(id).then(data => {
                $scope.objetivos = data.data;
            })


            obtenerMateriales()
            obtenerEventos()

        })
    }

    function obtenerMateriales() {
        let proyecto = $stateParams.proyecto;
        Material.obtenerConProyecto(proyecto).then(res => {
            $scope.materiales = res.data;
			$scope.$digest()
        })
    }

    function obtenerEventos() {
		console.log('voy')
		Evento.proyecto(id).then(res => {
	        $scope.eventos = res.data;
			$scope.$digest()
	    })
    }

    $scope.donarMateriales = function(material, ev) {

		$scope.usuario !== undefined ? (

			$mdDialog.show(
				$mdDialog.prompt()
				.title('¿Quiere aportar a esta causa?')
				.textContent('Empieza por introducir su titulo')
				.placeholder('Piezas para contribuir')
				.ok('Muchas Gracias por tu donativo')
				.cancel('Me arrepentí')
			).then(result => {

                Aportaciones.unir({
                    id_materiales: material.id,
                    id_usuario: $scope.usuario.id,
                    contribucion: result
                }).then(data => {
                    obtenerMateriales()
                });

			}, function() {
	            console.log('no confirmo')
	        })

		) : (

			alert = $mdDialog.alert({
				title: 'Inicia Sesión',
				textContent: 'Debes iniciar Sesión para donar a este proyecto',
				ok: 'Close'
			}),

			$mdDialog
			.show( alert )
			.finally(function() {
			  alert = undefined;
			})

		)


    }

    $scope.inscribirseEvento = function(evento, ev) {

		$scope.usuario !== undefined ? (

	        ventana = $mdDialog.confirm()
	        .title('Estas apunto de inscribirte al evento "' + evento.nombre + '"')
	        .textContent(evento.descripcion)
	        .ok('Aceptar')
	        .cancel('Cerrar')
	        .clickOutsideToClose(true),

	        $mdDialog.show(ventana).then(result => {

				delete $scope.eventos

				Evento.unir(evento.id, $scope.usuario.id)
				.then(data => {
					obtenerEventos()
	            })

	        }, function() {
	            console.log('no confirmo')
	        })

		) : (

			alert = $mdDialog.alert({
		        title: 'Inicia Sesión',
		        textContent: 'Debes iniciar Sesión para inscribite a este evento',
		        ok: 'Close'
			}),

	      	$mdDialog
	        .show( alert )
	        .finally(function() {
	          alert = undefined;
	        })

		)
    }

});
