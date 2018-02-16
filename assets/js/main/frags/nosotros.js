var app = angular.module('myapp');

app.controller('nosotrosCtrl', function($scope, $state, $rootScope, $stateParams, $http, mdDialog, Campana) {

    $scope.obtenerCampanas = function(data) {
        Campana.obtenerCampana().then(function(data) {
            $scope.campanas = data.data;
            console.log(data.data)
        })
    } 

    $scope.obtenerCampana = function(){
        Campana.obtenerOne($stateParams.campana).then(function(data){
            $scope.campana = data.data;
        })
    }

});

(function($){

    var scrollMagicController = new ScrollMagic.Controller();
  
    var vista = $(".vista1");
  
    var pendiente = $("md-card");
  
    TweenMax.staggerFrom(pendiente, 1, {
        cycle:{
          //an array of values
          backgroundColor:["red", "white", "#00f"],
          //function that returns a value
          y:function(index){
            return index * 20;
          }
        }
      }, 0.5);
      /* const Escena = new ScrollMagic.Scene({
        triggerElement: pendiente,
        triggerHook: 2
      }).setTween(TweenMax.from(pendiente, 1, {x : '-100%'} ))
      .addTo(scrollMagicController); */
   
  
    console.log("aqui");
  
  })(jQuery)