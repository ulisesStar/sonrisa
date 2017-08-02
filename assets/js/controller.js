app.controller('Ctrl', function ($scope, $rootScope, $http, mdDialog) {

    $scope.iniciosesion = function (ev) {
        mdDialog.mostrardialog('login', $scope.customFullscreen, ev);
    };

});


    