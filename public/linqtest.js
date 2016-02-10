var movieList;
var distributorList = ["IFC Films", "Magnolia Pictures", "Warner Bros."
						, "Kino Lorber", "20th Century Fox", "Sony Pictures"
						, "Lionsgate", "Sony Pictures Classics", "Universal"
						, "Walt Disney"];
var top10Distributors;
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
	
	console.log(top10Distributors);
});

function filterTopDistributor(x) {
	if (x.distributor != null) {
		return $.inArray(x.distributor, distributorList) >= 0;
	}
	return false;
}

function filterByDate(x, date1, date2) {
	var maxDate = (date1 > date2 ? date1 : date2);
	var minDate = (date1 < date2 ? date1 : date2);
	var xDate = new Date(x.released);
	return minDate <= xDate && xDate <= maxDate;
}