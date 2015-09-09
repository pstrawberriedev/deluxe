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
var pan     = new Hammer.Pan();

hammer.add(pan);

hammer.on('pan', function(e){
   $(confirmCreation).css('transform', 'translateX('+ e.deltaX +'px)');
  
    console.log(e.deltaX );
   
});