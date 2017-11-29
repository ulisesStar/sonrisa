var app = angular.module('myapp');

app.controller('proyectosPendientesCtrl', function($interval, $scope, $state, $stateParams, $rootScope, $http, $mdDialog, $localStorage, ProyectosPendientes, Evento, Imagen, Aportaciones, Material, Usuario, Anecdota) {

    var self = this;

    self.activated = true;
    self.determinateValue = 30;
    $scope.loaderProyectoPendiente = true;

    $interval(function() {

        self.determinateValue += 1;
        if (self.determinateValue > 100) {
            self.determinateValue = 30;
        }
    }, 100);

    if ($stateParams.proyecto === null) {
        $state.go('proyectos.vista1')
    } else {
        var idproyecto = $stateParams.proyecto;

        var status = 1;
        if ($scope.usuario === undefined) {
            var token = $localStorage.token;
            Usuario.token(token).then(data => {
                $scope.usuario = data.user;
            })
            console.log('obtuve el usuario');
        }

        $scope.map = {
            center: {
                latitude: 19.1847524,
                longitude: -96.1550328
            },
            zoom: 11
        };

        $scope.markers = [];

        ProyectosPendientes.obtener(idproyecto).then(function(data) {
            $scope.proyecto = data.data;
            $scope.loaderProyectoPendiente = false;
            console.log(data);

            _.map(data.Ubicacion, ubcacionesft)
            function ubcacionesft(n) {
                $scope.markers.push({latitude: n.latitude, longitude: n.longitude});
            }

			data.materiales.forEach(material => {
                material.recaudado = 0;
				let index
                material.Usuario.forEach(user => {
                    index++
                    material.recaudado = material.recaudado + user.Aportaciones.contribucion;
                })
            })

			$scope.Eventos = data.Status.Pendiente.Eventos;

        })

        Imagen.obtenerStatus(idproyecto, status).then(function(data) {
            $scope.imagenes = data;
            console.log(data);
        })

    }

    function obtenerMateriales() {
        let proyecto = $stateParams.proyecto;
        Material.obtenerConProyecto(proyecto).then(data => {
            $scope.proyecto.materiales = data;
        })
    }

    function obtenerEventos() {
        Evento.obtenerStatus(idproyecto, status).then(function(data) {
            console.log(data);
            $scope.Eventos = data;
        })
    }

    $scope.donarMateriales = function(material, ev) {
		console.log('si estoy siendo usado')
        $mdDialog.show({
            templateUrl: '/partials/materiales',
            parent: angular.element(document.body),
            locals: {
                material: material,
                usuario: $scope.usuario
            },
            bindToController: true,
            preserveScope: true,
            fullscreen: $scope.customFullscreen,
            controller: DialogController
        }).then(data => {
            obtenerMateriales();
            $scope.$apply();
        });
        function DialogController($scope, $mdDialog, material, usuario) {

            $scope.material = material;
            $scope.usuario = usuario;
            // console.log($scope.usuario);
            // console.log($scope.material);

            $scope.unir = function(cantidad) {
                union = {
                    id_materiales: material.id,
                    id_usuario: usuario.id,
                    contribucion: cantidad
                }

                let proyecto = $stateParams.proyecto;
                Aportaciones.unir(union).then(data => {
                    let status = true;
                    $mdDialog.hide(status);
                });
            }

            $scope.close = function() {
                let status = false;
                $mdDialog.hide(status);
            }
        }
    }

    $scope.inscribirseEvento = function(evento, ev) {

        $mdDialog.show({
            templateUrl: '/partials/evento',
            parent: angular.element(document.body),
            locals: {
                evento: evento,
                usuario: $scope.usuario
            },
            bindToController: true,
            preserveScope: true,
            fullscreen: $scope.customFullscreen,
            controller: DialogController
        }).then(data => {
            obtenerEvento();
            $scope.$apply();
        });
        function DialogController($scope, $mdDialog, evento, usuario) {

            $scope.evento = evento;
            $scope.usuario = usuario;

            $scope.unir = function() {

                Evento.unir(evento.id, usuario.id).then(data => {
                    let status = true;
                    $mdDialog.hide(status);
                });
            }

            $scope.close = function() {
                let status = false;
                $mdDialog.hide(status);
            }
        }
    }

});
