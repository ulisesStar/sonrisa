var app = angular.module('myapp');

app.controller('proyectoCtrl', function($scope, $rootScope, $state, $stateParams, $http, mdDialog, $mdDialog, Proyectos, Campana, Imagen, Evento, Area, Material, Ubicacion) {

    var id = $stateParams.id;

    Proyectos.one(id).then(res => {
        $scope.proyecto = res.data;
        $scope.$digest(); 
    })

    $scope.irProyecto = function(proyecto){

        console.log(proyecto)

        let nombre  =  _.snakeCase(proyecto.nombre);

        $state.go('proyecto', { id : proyecto.id, status: proyecto.status, nombre : nombre } )

    }

    $scope.status = function(id) {
        switch (id) {
            case 1:
                return 'pendiente'
                break;

            case 2:
                return 'progreso'
                break;

            case 3:

                return 'terminado'
                break;
            default:

        }
    }


    $scope.eliminarProyecto = function(id) {

        var id = $stateParams.id;

        ventana = $mdDialog.confirm().title('¿Seguro que quieres eliminar el proyecto?').textContent('Para eliminar de forma permanente dale en aceptar').ok('Aceptar').cancel('Cerrar').clickOutsideToClose(true);

        $mdDialog.show(ventana).then(function() {

            Proyectos.eliminar(id).then(function(data) {
                $state.go('proyectos');
            })

        }, function() {});
    }

});
