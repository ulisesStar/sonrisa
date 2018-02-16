var app = angular.module('myapp');

app.controller('imagenesCtrl', function($scope, $stateParams, $mdDialog, Imagen, alertas) {

    var id = $stateParams.id
    var status = $stateParams.status

    // Imagen.obtenerStatus(id, status).then(res => {
    //     $scope.imagenes = res.data;
    //     console.log($scope.imagenes);
    //     $scope.$digest();
    // 
    // })

    Imagen.obtener(id).then(res => {
        $scope.imagenes = res.data;
        console.log(res);
        $scope.$digest();

    })

    Imagen.obtenerPortada(id).then(res => {
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
                CrearNormal(imagen, proyecto);
                $scope.$digest();
                break;
            default:
        }
    }

    function CrearPortada(imagen, proyecto){

        imagen.id_proyecto = proyecto.id;
        Imagen.portadaCrear(imagen).then(function(data) {
            console.log(data);
            $scope.portada =  data.data
            console.log($scope.portada);
            $scope.$digest();
        })

    }

    function CrearNormal(imagen, proyecto) {


        imagen.id_proyecto = proyecto.id;


        Imagen.crear(imagen).then(res => {
            $scope.imagenes.push(res.data);
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
