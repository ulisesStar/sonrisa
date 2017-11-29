var app = angular.module('myapp');

app.controller('ubicacionesCtrl', function($scope, $stateParams, Ubicacion) {

    $scope.seccion = 'ubicaciones';

     $scope.seleccion = 0;

    Ubicacion.obtenerConProyecto($scope.proyecto.id).then(function(data) {
        console.log(data.data);
        $scope.ubicaciones = data.data.Ubicacion;

        _.map($scope.ubicaciones, ubcacionesft)
        function ubcacionesft(n) {
            $scope.markers.push({latitude: n.latitude, longitude: n.longitude});
        }

    })

    $scope.seleccionar = function(ubicacion){
           $scope.seleccion = ubicacion.id;
           $scope.ubicacion = ubicacion;
           console.log($scope.seleccion);
           $scope.formularioUbicacion = true;
   }

    $scope.submitUbicacion = function(ubicacion, proyecto){

       $scope.seleccion === 0 ? crear(ubicacion, proyecto) : update(ubicacion);

   }

   function crear(ubicacion, proyecto){
        console.log('estoy pasando')

        Ubicacion.crear(ubicacion).then(function(data) {
            $scope.$digest();
            $scope.ubicaciones.push(data.data);
            console.log(data.data);

            Ubicacion.unir(data.data.id, proyecto).then(function(data) {
                console.log(data.data);
            })
            $scope.formularioUbicacion = false;

        })
           
       }

       function update(ubicacion){
           console.log(ubicacion);
        Ubicacion.editar(ubicacion).then(function(data) {
            console.log(data);
            $scope.formularioUbicacion = false;
        })
       }

       $scope.crearUbicacion = function(){
           $scope.seleccion = 0;
           $scope.ubicacion = {};
           console.log($scope.seleccion);
       }


});
