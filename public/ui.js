var date1;
var date2;
$(document).ready(function() {

	$(function() {
    	$( "#radioColor" ).buttonset();
  });

	$("#radioMovie").click(function() {
		swapColors();
		console.log("swap to movies");	
  });

	$("#radioGenre").click(function() {
		swapColors("target");
		console.log("swap to movies");
  });

  $(function() {
    $( "#radioValue" ).buttonset();
  });

  $("#radioFilmCount").click(function() {
    showFilmCount()
    console.log("show film count");  
  });

  $("#radioGross").click(function() {
    showGross();
    console.log("show gross total");
  });

});	