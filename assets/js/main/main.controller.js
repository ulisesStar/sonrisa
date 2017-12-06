app.controller('mainCtrl', function($scope, $rootScope, $mdPanel, $state, $http, $mdDialog, AuthService, $localStorage, Usuario, $window) {

    $scope.auth = false;

    if($localStorage.token != null){
        $scope.auth = true;
    }

	if($window.location.pathname.length > 10){
		var url = $window.location.pathname;
		var token = url.split('/');
		AuthService.fb(token[1])
	}

    if($localStorage.auth === true){
        var token = $localStorage.token;
        AuthService.token(token).then(data => {
            Usuario.obtener(data.user.id).then(res => {
                $scope.usuario = res.data;
            })
        })
    }

    $scope.registro = function(usuario) {
        AuthService.registro(usuario);
    }

    $scope.login = function(x) {
        AuthService.login(x).then(data => {
            console.log(data);
            AuthService.token(data.token).then(usuario => {
                console.log(usuario);
                if(usuario.user != null){
                    $scope.usuario = data.user;
                    $scope.auth = true;
                    $state.go('home')
                }
            })
        });
    }

    $scope.logout = function(){

        ventana = $mdDialog.confirm()
        .title('¿Quieres hacer Logout?')
        .textContent('Si quieres hacerlo dale Aceptar')
        .ok('Aceptar')
        .cancel('Cerrar')
        .clickOutsideToClose(true);

        $mdDialog.show(ventana).then(function() {

            AuthService.logout();
            $scope.auth = false;

        }, function() {

        });
    }



    $scope.menu = function(ev){

        console.log(ev)

        var panelPosition = $mdPanel.newPanelPosition()
        .absolute()
        .top(ev.layerY + 'px')
        .right(ev.layerX + 'px');

        // var panelAnimation = $mdPanel.newPanelAnimation()
        // // .targetEvent(ev)
        // .defaultAnimation('md-panel-animate-fly')
        // .closeTo('.show-button');

        $mdPanel.open({
            attachTo: angular.element(document.body),
            position: panelPosition,
            targetEvent: ev,
            controller: function PanelMenuCtrl(mdPanelRef, $mdDialog, $scope, AuthService) {

                this.closeMenu = function() {
                    mdPanelRef && mdPanelRef.close();
                };

                $scope.logout = function(){

                    ventana = $mdDialog.confirm()
                    .title('¿Quieres hacer Logout?')
                    .textContent('Si quieres hacerlo dale Aceptar')
                    .ok('Aceptar')
                    .cancel('Cerrar')
                    .clickOutsideToClose(true);

                        $mdDialog.show(ventana).then(function() {

                            AuthService.logout();

                        }, function() {

                    });
                }
            },
            controllerAs: 'ctrl',
            template: '' +
                '<md-card>' +
                '   <md-list>' +
                '       <md-list-item ui-sref="perfil">' +
                '           <md-icon> person </md-icon>  ' +
                '           <p> perfil </p>  ' +
                '       </md-list-item>' +
                '       <md-divider></md-divider>' +
                '       <md-list-item ng-click="logout()">' +
                '           <md-icon> exit_to_app </md-icon>  ' +
                '           <p> Cerrar sesión </p>  ' +
                '       </md-list-item>' +
                '       <md-divider></md-divider>' +
                '   </md-list>' +
                '</md-card>',
            panelClass: 'panel',
            clickOutsideToClose: true,
            focusOnOpen: false,
            zIndex: 100,
            hasBackdrop : true,
            disableParentScroll: false,
            propagateContainerEvents: true,
            groupName: 'menus'
        });
    }

});
