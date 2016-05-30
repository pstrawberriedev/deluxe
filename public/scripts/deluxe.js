/*
  deluxe.js
*/
$(document).ready(function() {
  console.log('--> deluxe.js');
});

// Bootstrap Tooltip init
// Requires Bootstrap.min.js
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

// Flowtype Init
// http://simplefocus.com/flowtype/
$('body').flowtype({
   minimum   : 320,
   maximum   : 1980,
   minFont   : 10,
   maxFont   : 20,
   fontRatio : 30
});