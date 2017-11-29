var app = angular.module('myapp');

app.controller('eventosCtrl', function($scope, $state, $rootScope, $timeout, $stateParams, $http, Evento) {

    var idProyecto = $stateParams.idProyecto;

    $scope.seleccion = 0;

    Evento.obtenerStatus(idProyecto, $scope.proyecto.status_actual).then(function(data) {
        $scope.eventos = data.data;
        $scope.$digest();
        console.log($scope.eventos);
    })

        $scope.seleccionar = function(evento){
           $scope.seleccion = evento.id;
           $scope.evento = evento;
           console.log($scope.seleccion);
           $scope.formularioEvento = true;
       }

        $scope.submitEvento = function(evento, status, proyecto){

           $scope.seleccion === 0 ? crear(evento, status, proyecto) : update(evento);

       }

       function crear(evento, status, proyecto){
            console.log('estoy creando')
            console.log(evento);
            console.log(status);
            console.log(proyecto);

        switch (status) {
            case 1:
                evento.id_pendiente = proyecto;

                break;
            case 2:
                evento.id_progreso = proyecto;

                break;
            case 3:
                evento.id_terminado = proyecto;

                break;
        }

        $http.post('/data/eventos', evento).success(function(data) {
            $scope.eventos.push(data);
            $scope.evento = {};
        }).error(function(err) {
            console.log(err)
            alertas.mostrarToastEstandar("No se pudo crear el evento");
        })
       }

       function update(evento){
           console.log('estoy editando')
           Evento.editar(evento).then(function(data) {
               console.log(data);
           })
       }

       $scope.crearEvento = function(){
           $scope.seleccion = 0;
           $scope.evento = {};
           console.log($scope.seleccion);
       }

});
