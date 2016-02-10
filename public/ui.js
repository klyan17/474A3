$(document).ready(function() {
//date slider======================================
	$("#date-slider").dateRangeSlider({
		defaultValues:{
			min: new Date(2013,0,1),
			max: new Date(2014,11,31)},
		bounds: {
			min: new Date(2013,0,1),
			max: new Date(2014,11,31)},
		arrows: false});

	$("#date-slider").on("valuesChanging", function(e, data) {
		// console.log("min date: " + data.values.min + " max date: " + data.values.max);
		printMoviesByDate(data.values.min, data.values.max);
	});
});	