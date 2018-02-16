var app = angular.module('myapp');

app.controller('perfilCtrl', function($scope, $rootScope, $http, mdDialog, $localStorage, AuthService, Usuario, $state) {

    if($scope.usuario === undefined){
		$state.go('home')
    }else{

		var id = $scope.usuario.id

		Usuario.obtener(id).then(res => {

			$scope.usuario = res.data;
			console.log($scope.usuario)

		})

		Usuario.materiales(id).then(res => {

			$scope.materiales = res.data;
			console.log(res)

		})

		Usuario.eventos(id).then(res => {

			$scope.eventos = res.data;
			console.log(res)

		})

	}


});
