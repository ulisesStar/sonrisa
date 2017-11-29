app.directive('imagenproducto', function() {

    var template = '<md-progress-circular ng-disabled="!cargandoimagen" ng-if="cargandoimagen" class="md-hue-2" md-diameter="20px"></md-progress-circular><div class="md-card-image" ng-if="!hover"><img ng-src="{{imagen.imagen}}"><div>';

    return {
        scope: {
            id: '@'
        },
        restrict: 'EA',
        template: template,
        controller: function($scope, Imagen) {

            var id = $scope.id;
            $scope.cargandoimagen = true;

			Imagen.obtenerPortada(id).then(res => {
                console.log(res)
				$scope.imagen = res.data;
				$scope.cargandoimagen = false;
				$scope.$digest();

			})
        }
    };

});
