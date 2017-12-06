var app = angular.module('myapp');

app.controller('proyectosProgresosCtrl', function($q, $scope, $state, $stateParams, $localStorage, $mdDialog, ProyectosProgreso, Evento, Imagen, Usuario, Anecdota, Material, Portada, Ubicacion, Facebook, AuthService, Aportaciones) {

    $scope.loaderProyectoProgreso = true;
    if($stateParams.proyecto === null){
        $state.go('proyectos.vista1')
    }else{

        var idproyecto = $stateParams.proyecto;
        var status = 2;

        if($scope.usuario === undefined){
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


        ProyectosProgreso.obtener(idproyecto).then(res => {
            $scope.proyecto = res.data;
            console.log(res);
            $scope.loaderProyectoProgreso = false;

            // _.map(data.data.Ubicacion, ubcacionesft)
            // function ubcacionesft(n) {
            //     $scope.markers.push({latitude: n.latitude, longitude: n.longitude});
            // }

            // data.data.materiales.forEach(material => {
            //     material.recaudado = 0;
            //     let index
            //     material.Usuario.forEach(user => {
            //         index++
            //         material.recaudado = material.recaudado + user.Aportaciones.contribucion;
            //     })
            // })

			// $scope.Eventos = data.Status.Progreso.Eventos;

            return res.data.id
        }).then(id => {

            Portada.obtener(id).then(res => {
                $scope.portada = res.data;
            })

            Imagen.obtener(id).then(res => {
				$scope.imagenes = res.data;
				console.log(res);
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

            Anecdota.obtener(id).then(res => {
                $scope.anecdotas = res.data;
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
                .cancel('Me arrepenti')
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


	$scope.crearAnecdota = function(contenido){

		let anecdota = {
			contenido : contenido,
			id_usuario : $scope.usuario.id,
			id_proyecto : idproyecto
		}

		Anecdota.crear(anecdota).then(data => {
			console.log(data);
		})
	}

    $scope.facebook = function(){

        let contenido = 'algo'

        Facebook.crear(contenido, $scope.usuario).then(data => {
            console.log(data);
        })
    }



});
