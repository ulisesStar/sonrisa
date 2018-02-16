var app = angular.module('myapp');

app.controller('nuevoproyectoCtrl', function($scope, $state, Proyectos, Campana, Area, alertas) {

    $scope.proyecto = {
        pendiente : {},
        progreso : {},
        terminado : {}
    }

    Campana.obtenerCampana().then(function(data) {
        $scope.campanas = data.data;
        console.log(data);
    })

    Area.obtener().then(function(data) {
        $scope.areas = data.data;
        console.log(data);
    })
 
    $scope.cambiar = function(status) {
        switch (status) {
            case 1:
                $state.go('paso1.pendiente')
                break;
            case 2:
                $state.go('paso1.progreso')
                break;
            case 3:
                $state.go('paso1.terminado')
                break;
            default:

        }
    }

    $scope.submit = (proyecto) => {

        Proyectos.crear(proyecto).then(res => {
            alertas.mostrarToastEstandar("Proyecto creado");
            console.log(res.proyecto)
            let nombre  =  _.snakeCase(proyecto.nombre);
            $state.go('proyecto', { id : proyecto.id, status: proyecto.status, nombre : nombre } )
        });
        
    }
});
