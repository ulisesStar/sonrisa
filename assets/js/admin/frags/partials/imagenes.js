var app = angular.module('myapp');

app.controller('imagenesCtrl', function($scope, $stateParams, $mdDialog, Imagen, alertas) {

    $scope.seccion = 'imagenes';


    var idProyecto = $stateParams.idProyecto;

    Imagen.obtenerStatus(idProyecto, $scope.proyecto.status_actual).then(res => {
        $scope.imagenes = res.data;
        console.log($scope.imagenes);
        $scope.$digest();

    })

    Imagen.obtenerPortada(idProyecto).then(res => {
        $scope.portada = res.data;
        console.log(res)
        $scope.$digest();
    })

    $scope.modalidad = false;


    $scope.modo = (x) => {
        $scope.modalidad = x;
    }

    $scope.crearImagen = (imagen, proyecto) => {

        switch($scope.modalidad) {
            case 'portada':
                console.log('portada')
                CrearPortada(imagen, proyecto);
                break;

            case 'normal':
                console.log('normal')
                CrearNormal(imagen, proyecto)
                break;
            default:
        }
    }

    function CrearPortada(imagen, proyecto){

        imagen.id_proyecto = idProyecto;

        Imagen.portadaCrear(imagen).then(function(data) {
            $scope.portada = { imagen : imagen }
        })

    }

    function CrearNormal(imagen, proyecto) {

        switch (proyecto.status_actual) {
            case 1:
                var IdStatus = proyecto.Status.Pendiente.id;
                var ruta = 'imagenesconpendiente';
                break;
            case 2:
                var IdStatus = proyecto.Status.Progreso.id;
                var ruta = 'imagenesconprogreso';
                break;
            case 3:
                var IdStatus = proyecto.Status.Terminado.id;
                var ruta = 'imagenesconterminado';
                break;
            default:
        }

        Imagen.crear(ruta, IdStatus, imagen).then(function(data) {
            console.log(data);
            $scope.imagenes.push(data.data.imagen);
            $scope.$digest();
        })
    }

    $scope.eliminarImagen = function($index, id) {

        ventana = $mdDialog.confirm().title('¿Seguro que quieres eliminar la imagen?').textContent('Para eliminar una imagen dale en aceptar').ok('Aceptar').cancel('Cerrar').clickOutsideToClose(true);

        $mdDialog.show(ventana).then(function() {

            Imagen.eliminar(id).then(function(data) {
                $scope.imagenes.splice($index,1);
                $scope.$digest();
            })

        }, function() {});

    }


});
