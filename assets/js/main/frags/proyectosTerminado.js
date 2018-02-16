var app = angular.module('myapp');

app.controller('proyectosTerminadoCtrl', function($scope, $state, $stateParams, $localStorage, $rootScope, $http, mdDialog, ProyectosTerminado, Evento,Material, Imagen,Ubicacion, Usuario,AuthService, Anecdota, Objetivos) {

    $scope.loaderProyectoTerminado = true;
    $scope.usuarioComento = false;
    if($stateParams.proyecto === null){
        $state.go('proyectos.vista1')
    }else{
        var idproyecto = $stateParams.proyecto;
        console.log(idproyecto)
        var status = 3;
        if($scope.usuario === undefined){
            var token = $localStorage.token;
            AuthService.token(token).then(data => {
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

        ProyectosTerminado.obtener(idproyecto).then(res =>{
            $scope.proyecto = res.data;
            $scope.loaderProyectoTerminado = false;
            $scope.$digest()
            //$scope.fotoportada = _.find(data.Status.Terminado.Imagenes, ['portada', 1]);

            return res.data.id;
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
            });

            Anecdota.obtener(id).then(res => {
                $scope.anecdotas = res.data;
            });

            Objetivos.obtenerAll(id).then(data => {
                $scope.objetivos = data.data;
            })

            obtenerMateriales();
            obtenerEventos(id);
        });

        function obtenerMateriales() {
            let proyecto = $stateParams.proyecto;
            Material.obtenerConProyecto(proyecto).then(res => {
                $scope.materiales = res.data;
                $scope.$digest()
            })
        }
    
        function obtenerEventos(id) {
            Evento.proyecto(id).then(res => {
                $scope.eventos = res.data;
                $scope.$digest()
            })
        }

        $scope.crearAnecdota = function(contenido, idUsuario){
            console.log(idUsuario);
            var x= {
                contenido : contenido,
                id_usuario : $scope.usuario.id,
                id_proyecto : idproyecto
            }
    
            Anecdota.crear(x).then(data => {
                Anecdota.obtener(idproyecto).then(res => {
                    $scope.anecdotas = res.data;
                    $scope.$digest();
                });
            })
        }

        $scope.isAnecdotaUsuario = function(idUsuario, idUsuarioComentario){
            if(idUsuario==idUsuarioComentario){
                return true
            }else{
                return false;
            }
        };


    
        $scope.facebook = function(){
    
            let contenido = 'algo'
    
            Facebook.crear(contenido, $scope.usuario).then(data => {
                console.log(data);
            })
        }

    }

});
