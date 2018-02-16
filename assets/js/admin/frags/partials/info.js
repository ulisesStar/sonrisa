var app = angular.module('myapp');

app.controller('infoCtrl', function($scope, $state, $rootScope, $timeout ,$stateParams, $http,$mdDialog, Facebook, Campana, Area, $transitions, Proyectos, Objetivos, alertas) {

    $scope.seccion = 'info';
    $scope.status = false

    var idProyecto = $stateParams.id

    Campana.obtenerCampana().then(function(data) {
        $scope.campanas = data.data;
        $scope.$digest();
    })

    Area.obtener().then(function(data) {
        $scope.areas = data.data;
    })

    Objetivos.obtenerAll(idProyecto).then(data => {
        $scope.objetivos = data.data;
    })

	$scope.editar = function(proyecto){

        Proyectos.editarProyecto(proyecto).then(res => {
            // $scope.proyectoCreado.push = data;
            // $state.go('proyectos'); 
        })

    }

    $scope.cambiarStatusObjetivo = function (objetivo){
        console.log(objetivo.status);
        switch(objetivo.status){
            case "true":
                objetivo.status="true";
                break;
            case "false":
                objetivo.status="false";
                break;
        }
        console.log(objetivo);
        Objetivos.editarObjetivo(objetivo).then(res => {
            console.log(res);
        });
    }

   $scope.dialogObjetivo = function () {
    $mdDialog.show({
        controller: function($scope, objetivos){
            $scope.objetivos = objetivos
            $scope.agregarObjetivo = function(objet) {

                let objetivo = {
                    objetivo : objet.objetivo,
                    id_proyecto: idProyecto
                }

                Objetivos.agregarObjetivo(objetivo).then(res => {
                    $mdDialog.hide(res.data);
                });   
            }
        },
        templateUrl: '/partials/objetivo',
        parent: angular.element(document.body),
        bindToController: true,
        preserveScope: true,
        clickOutsideToClose: true,
        fullscreen: $scope.customFullscreen,
        locals: {
            objetivos: $scope.objetivos,
        }
    }).then(res => {
        $scope.objetivos.push(res);
    });
   } 

   $scope.eliminarObjetivo = function (id, index) {
    var idObjetivo = id;
    ventana = $mdDialog.confirm().title('¿Seguro que quieres eliminar el objetivo?').textContent('Para eliminar de forma permanente dale click en Aceptar').ok('Aceptar').cancel('Cerrar').clickOutsideToClose(true);

    $mdDialog.show(ventana).then(function() {

        Objetivos.eliminarObjetivo(idObjetivo).then(function(data) {
           $scope.objetivos.splice(index, 1);
           $scope.$digest();
        })

    });
   }
   

});
