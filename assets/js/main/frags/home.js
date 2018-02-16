var app = angular.module('myapp');

app.controller('homeCtrl', function($scope, $state, $rootScope, $timeout ,$stateParams, $http, Facebook, $transitions, Anecdota) {


    FB.getAccessToken(function(response) {
    });

    FB.getLoginStatus(function(response) {
    });

    $scope.posteo = function(){
        $state.go('proyectos.vista1')
    }

    $scope.vistas = [
        {destino: 'home.primero'},
        {destino: 'home.segundo'},
        {destino: 'home.tercero'}
    ];
    

    $scope.currentIndex = 0;
    $scope.actualvista = $scope.vistas[0];

    $scope.next = function(actualvista) {
        $scope.currentIndex < $scope.vistas.length - 1
            ? $scope.currentIndex++
            : $scope.currentIndex = 0;

        $state.go($scope.vistas[$scope.currentIndex].destino)

    };

    $scope.prev = function() {
        $scope.currentIndex > 0 ? $scope.currentIndex-- : $scope.currentIndex = $scope.vistas.length - 1;
    };

    $scope.$watch('currentIndex', function() {
        $scope.vistas.forEach(function(image) {
            image.visible = false;
        });
    });

    var sliderFunc = function(valor) {

        $scope.timer = $timeout(function() {
            $scope.next($scope.actualvista.id);


                    sliderFunc();

            }, 5000);
    };

    $transitions.onStart({}, trans => {

        $timeout.cancel($scope.timer)
        console.log('se cancelo');

    });

    sliderFunc();


    $scope.anecdotass = function(){
        Anecdota.obtenerAll().then(res => {
            $scope.anecdotas = res.data;
            console.log($scope.anecdotas)
        });
    }
});
