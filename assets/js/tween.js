
/* app.directive('background', function() {

	var body = $('html')

    var tl = new TimelineMax({
      repeat:-1,
      yoyo: true
    });

    var reverseRepeat = function(tl) {
      tl.reverse(0); // 0 sets the playhead at the end of the animation
    }

    tl.fromTo(body, 18, {backgroundPosition:'0% 82%', easy:Power1.easyIn}, {backgroundPosition:'100% 19%',  easy:Power1.easyIn})

});

 */

/* (function($){

  var scrollMagicController = new ScrollMagic.Controller();

  var vista = $(".vista1");

  var pendiente = $("md-grid-list");

  TweenMax.staggerTo(pendiente, 1, {rotation:360, y:100}, 0.5);
    const Escena = new ScrollMagic.Scene({
      triggerElement: pendiente,
      triggerHook: 2
    }).setTween(TweenMax.from(pendiente, 1, {x : '-100%'} ))
    .addTo(scrollMagicController);
 

  console.log("aqui");

})(jQuery) */