var movieList;
var distributorList = ["IFC Films", "Magnolia Pictures", "Warner Bros."
						, "Kino Lorber", "20th Century Fox", "Sony Pictures"
						, "Lionsgate", "Sony Pictures Classics", "Universal"
						, "Walt Disney"];
var genreList = ["Drama", "Comedy", "Documentary", "Adventure", "Action"
				, "Thriller/Suspense", "Horror", "Romantic Comedy", "Musical"
				, "Black Comedy"];
var top10Distributors;
var resultMovies;

$(document).ready(function() {
	//parse data
	var datapath = "movies-2014.csv";
	var csvfile = $.ajax({
		type: "GET",
		url: datapath,
	    async: false,
		dataType: "text",
		
	});

	movieList = Papa.parse(csvfile.responseText, {
					    header: true,
					    dynamicTyping: true,
					}).data;

	//linq edit

	top10Distributors = movieList
	.where(function(x) { return filterTopDistributor(x)})
	.orderBy(function(x) { return x.distributor});

	resultMovies = top10Distributors;
	//console.log(top10Distributors);
	//console.log(genreList);
	createMovieMatrix();
	setMatrix(resultMovies);
	createChart(movieMatrix);
});

function filterTopDistributor(x) {
	if (x.distributor != null) {
		return $.inArray(x.distributor, distributorList) >= 0;
	}
	return false;
}

function setFilteredMovie(date1, date2) {
	resultMovies = top10Distributors.where(function(x) { return filterByDate(x,date1,date2)});
	//console.log(resultMovies);
}

function filterByDate(x, date1, date2) {
	var maxDate = (date1 > date2 ? date1 : date2);
	var minDate = (date1 < date2 ? date1 : date2);
	var xDate = new Date(x.released);
	return minDate <= xDate && xDate <= maxDate;
}

function createMovieMatrix() {
	for (var i = 0; i < 20; i++) {
		for (var j = 0; j < 20; j++) {
			movieMatrix[i][j] = 0;
		}
	}
}

function setMatrix(m) {
	jQuery.each(m, function() {
		var distIndex = distributorList.indexOf(this.distributor);
		var genreIndex = 19 - genreList.indexOf(this.genre);
		movieMatrix[distIndex][genreIndex] += 1;
		movieMatrix[genreIndex][distIndex] += 1;
		// console.log(this.distributor + ":" + distIndex);
		// console.log(this.genre + ":" + genreIndex);
	});
}