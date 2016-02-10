var movielist

$(document).ready(function() {
	//parse data
	var datapath = "movies-2014.csv";
	var csvfile = $.ajax({
		type: "GET",
		url: datapath,
	    async: false,
		dataType: "text",
		
	});

	movielist = Papa.parse(csvfile.responseText, {
					    header: true,
					    dynamicTyping: true,
					}).data;
	console.log(movielist);

	//linq edit

	var a = movielist
	.where(function(x) { return filter1(x)})
	.orderBy(function(x) { return x.distributor})
	.take(20);
	console.log(a);

	function filter1(x) {
		if (x.distributor != null) {
			return x.distributor.length > 0;
		}
		return false;
	}
});