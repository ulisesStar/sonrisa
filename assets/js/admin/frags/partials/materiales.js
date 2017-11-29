var app = angular.module('myapp');

app.controller('materialesCtrl', function($scope ,$stateParams, Material) {

    $scope.seccion = 'materiales';

    $scope.seleccion = 0;

    Material.obtenerConProyecto($scope.proyecto.id).then(function(data) {
        $scope.materiales = data.data;
        $scope.$digest();

    })


		$scope.seleccionar = function(material){
           $scope.seleccion = material.id;
           $scope.material = material;
           console.log($scope.seleccion);
           $scope.formularioMaterial = true;
       }

        $scope.submitMaterial = function(material, proyecto){

           $scope.seleccion === 0 ? crear(material, proyecto) : update(material);

       }

       function crear(material, proyecto){
		console.log(proyecto);
		material.id_proyecto = proyecto;
		Material.crear(material).then(function(data) {
			$scope.$digest();
			console.log(data.data.nombre);
			$scope.materiales.push(data.data.nombre);
			$scope.formularioMaterial = false;
		})
           
       }

       function update(material){
           console.log('estoy editando')
           Material.editar(material).then(function(data) {
				console.log(data);
				$scope.formularioMaterial = false;
			})
       }

       $scope.crearMaterial = function(){
           $scope.seleccion = 0;
           $scope.material = {};
           console.log($scope.seleccion);
       }

});
