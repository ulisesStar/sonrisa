app.controller('adminCtrl', function($scope, $rootScope, $http, $mdDialog, mdDialog, $timeout, $stateParams, $mdSidenav, alertas, $state, Area, Campana, Proyectos, Imagen, Material, Ubicacion) {

    Campana.obtenerCampana().then(function(data) {
        $scope.campanas = data.data;
        $scope.$digest();
    });
    
    Area.obtener().then( res => {
        $scope.areas = res.data;
        $scope.$digest();
    });

    $scope.secciones = [
        {
            nombre: 'home',
            href: 'home',
            icon: 'home'
        }, {
            nombre: 'Proyectos',
            href: 'proyectos',
            icon: 'work'
        }, {
            nombre: 'Areas',
            href: 'areas',
            icon: 'folder'
        }, {
            nombre: 'Programas',
            href: 'campanas',
            icon: 'folder'
        }
    ]

    $scope.toggleLeft = buildToggler('left');

    function buildToggler(componentId) {
        return function() {
            $mdSidenav(componentId).toggle();
        };
    }

    $scope.AbrirEvento = function() {
        $scope.formularioEvento = true;
    }
    $scope.CerrarEvento = function() {
        $scope.formularioEvento = false;
    }
    $scope.eventos = [];
    $scope.AgregarEvento = function(evento, proyectoCreado) { //AGREGA UN EVENTO A UN PROYECTO YA CREADO

        switch (proyectoCreado.status_actual) {
            case 1:
                evento.id_pendiente = proyectoCreado.id;

                break;
            case 2:
                evento.id_progreso = proyectoCreado.id;

                break;
            case 3:
                evento.id_terminado = proyectoCreado.id;

                break;
        }

        console.log(evento);

        $http.post('/data/eventos', evento).success(function(data) {
            $scope.eventos.push(data);
            alertas.mostrarToastEstandar("evento creado");
            $scope.nuevoevento = {};
            $scope.formularioEvento = false;
        }).error(function(err) {
            alertas.mostrarToastEstandar("No se pudo crear el evento");
        })

    }

    $scope.Abrir = function() {
        $scope.formularioMaterial = true;
    }
    $scope.Cerrar = function() {
        $scope.formularioMaterial = false;
    }

    $scope.materiales = [];

    $scope.AgregarMaterial = function(material, proyectoCreado) {

        material.id_proyecto = proyectoCreado.id;
        Material.crear(material).then(function(data) {
            $scope.formularioMaterial = false;
            $scope.materiales.push(data);

        })

    }

    $scope.AbrirUbicacion = function() {
        $scope.formularioUbicacion = true;
    }
    $scope.CerrarUbicacion = function() {
        $scope.formularioUbicacion = false;
    }

    $scope.ubicaciones = [];

    $scope.nuevaUbicacion = function(ubicacion) {
        var ubicaciones = {
            nombre: ubicacion.nombre,
            latitud: ubicacion.latitud,
            altitud: ubicacion.altitud,
            direccion: ubicacion.direccion,
            apertura: ubicacion.apertura,
            cierre: ubicacion.cierre
        }

        Ubicacion.crear(ubicaciones).then(function(data) {
            $scope.ubicaciones.push(data);

            Ubicacion.unir(data.id, $scope.proyectoCreado.id).then(function(data) {
                console.log(data);
            })
            $scope.formularioUbicacion = false;

        })

    }

    $scope.CampanaDialog = function(ev) {
        $mdDialog.show({
            controller: function($scope, campanas){
                $scope.campanas = campanas
                $scope.nuevaCampana = function(campana) {

                    let imagen = 'data:image/png;base64, ' + campana.foto.base64;
            
                    var campanas = {
                        nombre: campana.nombre,
                        descripcion: campana.descripcion,
                        logo: imagen,
                        fecha: campana.fecha
                    } 
                    Campana.crear(campanas).then(res =>{
                        alertas.mostrarToastEstandar("Nuevo Programa Creado");
                        $mdDialog.hide(res.data);
                    });   
                }
            },
            templateUrl: '/partials/nuevacampana',
            parent: angular.element(document.body),
            bindToController: true,
            preserveScope: true,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen,
            locals: {
                campanas: $scope.campanas,
            }
        }).then(res => {
            $scope.campanas.push(res);
        });


    };

    $scope.obtenerDatos = function() {

        Campana.obtenerCampana().then(function(data) {
            $scope.campanas = data.data;
        })

        Area.obtener().then(function(data) {
            $scope.areas = data.data;
        })
    }

    

    $scope.eliminarCampana = function(id, $index) {

        var idCampana = id;
        ventana = $mdDialog.confirm().title('¿Seguro que quieres eliminar el programa?').textContent('Para eliminar de forma permanente dale click en Aceptar').ok('Aceptar').cancel('Cerrar').clickOutsideToClose(true);

        $mdDialog.show(ventana).then(function() {

            Campana.eliminar(idCampana).then(function(data) {
                Campana.obtenerCampana().then(function(data) {
                    $scope.campanas = data.data;
                    $scope.$digest();
                });
                $state.go('campanas');
            })

        }, function() {});
    }

    $scope.eliminarArea = function(id) {

        var idArea = $stateParams.idArea;

        ventana = $mdDialog.confirm().title('¿Seguro que quieres eliminar el Area?').textContent('Para eliminar de forma permanente dale click en Aceptar').ok('Aceptar').cancel('Cerrar').clickOutsideToClose(true);

        $mdDialog.show(ventana).then(function() {

            Area.eliminar(idArea).then(function(data) {
                Area.obtener().then(res => {
                    $scope.areas = res.data;
                    $scope.$digest();
                });
                $state.go('areas');
            })

        }, function() {});
    }

    $scope.AreaDialog = function(ev) {
        $mdDialog.show({
            controller: function($scope, areas){
                $scope.areas = areas;
                $scope.nuevaArea = function(areas) {

                    let area = {
                        nombre : areas.nombre
                    }
            
                    Area.crear(area).then(res => {
                        alertas.mostrarToastEstandar("Nueva Area Creada");
                        $mdDialog.hide(res.data);
                    });
                }
            },
            templateUrl: '/partials/nuevaarea',
            parent: angular.element(document.body),
            bindToController: true,
            preserveScope: true,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen,
            locals: {
                areas: $scope.areas,
            }
        }).then(res => {
            $scope.areas.push(res);
        });
    };

    $scope.nuevaArea = function(areas) {
        

        let area = {
            nombre : areas.nombre
        }

        Area.crear(area).then(res => {
            $scope.areas.push(res.data);
            $scope.$digest();
        });
        $mdDialog.hide();
        $state.go('areas');
    }

    $scope.imagenes = [];

    $scope.agregarGrid = function(foto, proyectoCreado) {


        switch (proyectoCreado.status_actual) {
            case 1:
                var IdStatus = proyectoCreado.Status.Pendiente.id;
                var ruta = 'imagenesconpendiente';
                break;
            case 2:
                var IdStatus = proyectoCreado.Status.Progreso.id;
                var ruta = 'imagenesconprogreso';
                break;
            case 3:
                var IdStatus = proyectoCreado.Status.Terminado.id;
                var ruta = 'imagenesconterminado';
                break;
            default:
        }

        var imagen = 'data:image/png;base64,' + foto.base64;

        Imagen.crear(ruta, IdStatus, imagen).then(function(data) {

            $scope.imagenes.push(data.imagen);
            $scope.idImagen = data;

        })

    }

    $scope.quitarGrid = function(index, idImagen) {

        ventana = $mdDialog.confirm().title('¿Seguro que quieres eliminar la imagen?').textContent('Para eliminar una imagen dale en aceptar').ok('Aceptar').cancel('Cerrar').clickOutsideToClose(true);

        $mdDialog.show(ventana).then(function() {

            var id = idImagen.id;
            console.log(id);

            Imagen.eliminar(id).then(function(data) {
                console.log(data);
            })

        }, function() {});

    }

    $scope.Dropify = function() {

        $('.dropify').dropify({
            messages: {
                default: 'Agregar',
                replace: 'Reemplazar', 
                remove: 'Eliminar',
                error: 'Error'
            }
        });

        $('.dropify').on('change', function() {

            var input = this;
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function(e) {
                    // bind new Image to Component
                    $scope.$apply(function() {
                        $scope.inputImage = e.target.result;
                    });
                }

                reader.readAsDataURL(input.files[0]);
            }
        });

    };

    $scope.campana,
    $scope.area = []

    $scope.editarArea = function(areas) {
        var id = areas.id;
        $http.put('/data/areas/' + id, areas).success(function(data) {
            $scope.area.push({nombre: areas.nombre})
            console.log($scope.area);
            $state.go('areas');

        }).error(function(err) {
            console.log(err)
        })
    }

    $scope.editarCampana = function(data) {

        console.log(data);
        Campana.editar(data).then(function(data) {
            alertas.mostrarToastEstandar("Programa Editado Correctamente");
            console.log(data);
            $scope.campanas.push(data.nombre);
            $scope.$digest();
        })

        $state.go('campanas');

    }

    $scope.resetView = function(){
        $scope.inputImage = null;
        $(".dropify-clear").trigger("click");

    }

});
