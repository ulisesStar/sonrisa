app.controller('mainCtrl', function ($scope, $rootScope, $http, mdDialog) {

    $scope.iniciosesion = function (ev) {
        mdDialog.mostrardialog('mainCtrl', 'login', $scope.customFullscreen, ev);
    };

    $scope.botones = [{
        title: 'Home',
        icon: 'whatshot',
        color: 'red',
        sref: 'home'
    }, {
        title: 'Yellow',
        icon: 'flash_on',
        color: 'yellow',
        sref: 'yellow'
    }, {
        title: 'Purple',
        icon: 'public',
        color: 'purple',
        sref: 'purple'
    }, {
        title: 'Blue',
        icon: 'filter_hdr',
        color: 'blue',
        sref: 'blue'
    }, {
        title: 'Green',
        icon: 'nature',
        color: 'green',
        sref: 'green'
    }];

    // Slider

    $scope.images = [{ title: 'Creativity', src: 'http://www.voicehacker.co.uk/wp-content/uploads/2014/07/meet-the-artist-4.jpg' }, { title: 'Goals', src: 'http://www.myrkothum.com/wp-content/uploads/2014/05/reach-your-goals.jpg' }, { title: 'Effectiveness', src: 'http://www.basketrevolution.es/media/wysiwyg/basket.jpg' }, { title: 'Passion', src: 'http://cdn-media-4.lifehack.org/wp-content/files/2014/05/15-Things-Truly-Passionate-People-Do-Differently.jpg' }];

    $http.get('/data/personasData').then(function (data) {
        $scope.personas = data.data;
        console.log(data.data);
    });

    $scope.nuevaPersona = function(data){
        $http.post('/data/personasData').then(function (data) {
            $scope.persona = data.data;
            console.log(data.data);
        });
    }

    //
    // $http.get('/data/dataImagen').then(function (data) {
    //     $scope.imagenes = data.data;
    //     console.log(data.data);
    // });


});
