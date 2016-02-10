$(document).ready(function() {
	//parse data
	var datapath = "movies-2014.csv";
	var csvfile = $.ajax({
		type: "GET",
		url: datapath,
	    async: false,
		dataType: "text",
		
	});

	var movielist = Papa.parse(csvfile.responseText, {
					    header: true,
					    dynamicTyping: true,
					}).data;
	console.log(movielist);

	//linq edit
	// var queryResult = Enumerable.From(movielist)
	// 	.Where("$data.distributor = 'Walt Disney'")
	// 	.ToArray();

	var a = movielist
	.where(function(x) { return x.distributor == "Walt Disney"});
	console.log(a);
});