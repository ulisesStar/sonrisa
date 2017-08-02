app.controller('adminCtrl', function($scope, $rootScope, $http, mdDialog, $timeout, $mdSidenav, alertas, $state) {

    $scope.cambiar = function(status) {
        switch (status) {
            case 1:

                $state.go('nuevoproyecto.pendiente')
                break;
            case 2:
                $state.go('nuevoproyecto.progreso')
                break;
            case 3:
                $state.go('nuevoproyecto.terminado')
                break;
            default:

        }
    }

    $scope.secciones = [{
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
        nombre: 'Campañas',
        href: 'campanas',
        icon: 'folder'
    }]

    $scope.toggleLeft = buildToggler('left');

    function buildToggler(componentId) {
        return function() {
            $mdSidenav(componentId).toggle();
        };
    }

    $scope.dropify = function() {
        $('.dropify').dropify({
            messages: {
                default: 'Agregar',
                replace: 'Reemplazar',
                remove: 'Eliminar',
                error: 'Error'
            }
        });
    };

    $scope.proyecto = []
    $scope.pendiente = []
    $scope.progreso = []
    $scope.terminado = []

    $scope.IngresarProyecto = function() {
        console.log($scope.proyecto.status_actual)
        switch ($scope.proyecto.status_actual) {
            case 1:
                $scope.proyectos = {
                    "nombre": $scope.proyecto.nombre,
                    "descripcion": $scope.proyecto.descripcion,
                    "status_actual": $scope.proyecto.status_actual,
                    "campana_actual": $scope.proyecto.Id_campana,
                    "Status": $scope.pendientes = {
                        "Pendiente": $scope.pendientes = {
                            "objetivos": $scope.pendiente.objetivo,
                            "tareas": $scope.pendiente.tareas,
                            "numero_voluntarios": $scope.pendiente.voluntarios,
                            "fecha_inicio": $scope.pendiente.fecha
                        },
                        "Progreso": {},
                        "Terminado": {}
                    }
                }

                break;
            case 2:
                $scope.proyectos = {
                    "nombre": $scope.proyecto.nombre,
                    "descripcion": $scope.proyecto.descripcion,
                    "status_actual": $scope.proyecto.status_actual,
                    "campana_actual": $scope.proyecto.Id_campana,
                    "Status": $scope.progreso = {
                        "Pendiente": {},
                        "Progreso": $scope.progreso = {
                            "reportes_avance": $scope.progreso.avances,
                            "fechas_avance": $scope.progreso.fechas
                        },
                        "Terminado": {}
                    }
                }

                break;
            case 3:
                $scope.proyectos = {
                    "nombre": $scope.proyecto.nombre,
                    "descripcion": $scope.proyecto.descripcion,
                    "status_actual": $scope.proyecto.status_actual,
                    "campana_actual": $scope.proyecto.Id_campana,
                    "Status": $scope.terminado = {
                        "Pendiente": {},
                        "Progreso": {},
                        "Terminado": $scope.terminado = {
                            "resultados": $scope.terminado.resultados,
                            "duracion": $scope.terminado.duracion
                        }
                    }
                }

                break;

            default:
        }

        var proyectos = $scope.proyectos;
        console.log(proyectos);

        $http.post('/data/CrearProyecto', proyectos).success(function(data) {
            console.log(data)

            $state.go('nuevoproyecto.eventoseimagenes');

            $scope.proyectoCreado = data;

            var idcampanas = $scope.proyectoCreado.campana_actual;
            var idproyectos = $scope.proyectoCreado.id;

            $http.post('/data/campanas/' + idcampanas + '/' + idproyectos).success(function(data) {
                console.log(data)
            }).error(function(err) {
                console.log(err)
            })

        }).error(function(err) {
            console.log(err)
        })

    };

    $scope.eventos = [];

    $scope.nuevoEvento = function() {
        $scope.formularioEvento = true;
    }

    $scope.AgregarEvento = function(evento, proyectoCreado) { //AGREGA UN EVENTO A UN PROYECTO YA CREADO

        console.log(proyectoCreado);

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
            console.log(data);
            alertas.mostrarToastEstandar("evento creado");
            $scope.nuevoevento = {};
            $scope.formularioEvento = false;
        }).error(function(err) {
            console.log(err)
            alertas.mostrarToastEstandar("No se pudo crear el evento");
        })

    }

    $scope.obtenerProyecto = function() {

        $http.get('/data/proyectos').success(function(data) {
            $scope.proyectos = data;
            console.log($scope.proyectos);
        }).error(function(err) {
            console.log(err)
        })

    }

    $scope.CampanaDialog = function(ev) {
        mdDialog.mostrardialog('adminCtrl', 'nuevacampana', $scope.customFullscreen, ev);
    };

    $scope.campanas = []
    $scope.areas = []

    $scope.obtenerCampanas = function() {

        $http.get('/data/campanas').success(function(data) {
            $scope.campanas = data;
            console.log($scope.campanas);
        }).error(function(err) {
            console.log(err)
        })

    }

    $scope.campana = []
    $scope.campanas = []
    $scope.nuevaCampana = function() {

        console.log($scope.campana)

        $http.post('/data/campanas', {
            nombre: $scope.campana.nombre,
            descripcion: $scope.campana.descripcion,
            id_areas: $scope.campana.id_areas
        }).success(function(data) {
            alertas.mostrarToastEstandar("Nueva Campaña Creada");
            $scope.campanas.push({
                nombre: $scope.campana.nombre
            })
            console.log($scope.campanas)
        }).error(function(err) {
            console.log(err)
        })

    }

    $scope.AreaDialog = function(ev) {
        mdDialog.mostrardialog('adminCtrl', 'nuevaarea', $scope.customFullscreen, ev);
    };

    $scope.Obtenerareas = function() {
        $http.get('/data/areas').success(function(data) {
            $scope.areas = data;
            console.log($scope.areas)
        }).error(function(err) {
            console.log(err)
        })
    }

    $scope.area = []

    $scope.nuevaArea = function() {
        console.log($scope.area)

        $http.post('/data/areas', {
            nombre: $scope.area.nombre
        }).success(function(data) {
            alertas.mostrarToastEstandar("Nueva Area Creada");
            $scope.area.push($scope.nombre)
            console.log($scope.area)
        }).error(function(err) {
            console.log(err)
        })

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

        console.log(imagen);

        $http.post('data/' + ruta + '/' + IdStatus, {
            'imagen': imagen
        }).success(function(data) {
            $scope.imagenes.push(data.imagen);
            $scope.idImagen = data;
            console.log(data.id)
            console.log('Agregada');
        }).error(function(err) {
            console.log(err)
        })
    }

    $scope.quitarGrid = function(index, idImagen) {

        var id = idImagen.id;
        console.log(id);

        $http.delete('/data/imagenes/' + id).success(function(data) {
            $scope.imagenes.splice(index);
            console.log('Eliminada')
        }).error(function(err) {
            console.log(err)
        })

    }

    $scope.asignarDropify = function() {

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

    $scope.outputImage = null;
    $scope.inputImage = null;
    $scope.onUpdate = function(data) {
        // runs whenever there's a change
    }

    $scope.area = []
    $scope.editarArea = function(areas) {
        var id = areas.id;
        $http.put('/data/areas/' + id, areas).success(function(data) {
            $scope.area.push({
                nombre: areas.nombre
            })
            console.log($scope.area);
            $state.go('areas');

            // $state.go('nuevoproyecto.eventoseimagenes');
        }).error(function(err) {
            console.log(err)
        })
    }

    $scope.campana = []
    $scope.editarCampana = function(campanas) {
        var id = campanas.id;
        $http.put('/data/campanas/' + id, campanas).success(function(data) {
            $scope.campana.push({
                nombre: campanas.nombre,
                descripcion: campanas.descripcion,
                fecha: campanas.fecha,
                id_areas: campanas.id_areas,
            })
            console.log($scope.campana);
            $state.go('campanas');
        }).error(function(err) {
            console.log(err)
        })
    }

});
