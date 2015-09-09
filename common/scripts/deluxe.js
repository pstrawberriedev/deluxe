/*
  deluxe.js
*/
$(document).ready(function() {
  console.log('--> deluxe.js');
});

// Flowtype Init
// http://simplefocus.com/flowtype/
$('body').flowtype({
   minimum   : 320,
   maximum   : 1980,
   minFont   : 10,
   maxFont   : 20,
   fontRatio : 30
});



/*
  home.js [merge??]
*/
var confirmCreation      = document.getElementById('confirm');
var hammer    = new Hammer.Manager(confirmCreation);
var swipe     = new Hammer.Swipe();

hammer.add(swipe);

hammer.on('swipeleft', function(){
   $(confirmCreation).animate({left: "-=100"}, 100)  
});

hammer.on('swiperight', function(){
   $(confirmCreation).animate({left: "+=100"}, 100)  
});