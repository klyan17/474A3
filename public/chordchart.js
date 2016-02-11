$(document).ready(function() {

  var matrix = [
    [0, 0, 0, 100, 100, 1000],
    [0, 0, 0, 25, 50, 500],
    [0, 0, 0, 10, 250, 250],
    [100, 50, 25, 0, 0, 0],
    [100, 50, 25, 0, 0, 0],
    [1000, 50, 25, 0, 0, 0]
  ];

  var chord = d3.layout.chord()
      .sortSubgroups(d3.descending)
      .matrix(matrix);

  var width = 720,
      height = 720,
      innerRadius = 150,
      outerRadius = innerRadius * 1.25;

  var fill = d3.scale.ordinal()
      .domain(d3.range(20))
      .range(['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a'
        ,'#8dd3c7','#ffffb3','#bebada','#fb8072','#80b1d3','#fdb462','#b3de69','#fccde5','#d9d9d9','#bc80bd']);

  var svg = d3.select("#chart").append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  svg.append("g").selectAll("path")
      .data(chord.groups)
    .enter().append("path")
      .style("fill", function(d) { return fill(d.index); })
      .style("stroke", function(d) { return fill(d.index); })
      .attr("d", d3.svg.arc().innerRadius(outerRadius).outerRadius(function(d) { return outerRadius + Math.random() * 100}))
      .on("mouseover", fade(.1))
      .on("mouseout", fade(1));

  svg.append("g").selectAll("path")
      .data(chord.groups)
    .enter().append("path")
      .style("fill", function(d) { return "ffffff"; })
      .style("stroke", function(d) { return fill(d.index); })
      .attr("d", d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius))
      .on("mouseover", fade(.1))
      .on("mouseout", fade(1));

  svg.append("g")
      .attr("class", "chord")
    .selectAll("path")
      .data(chord.chords)
    .enter().append("path")
      .attr("d", d3.svg.chord().radius(innerRadius))
      .style("fill", function(d) { return fill(d.target.index); })
      .style("opacity", 1);

  // Returns an event handler for fading a given chord group.
  function fade(opacity) {
    return function(g, i) {
      svg.selectAll(".chord path")
          .filter(function(d) { return d.source.index != i && d.target.index != i; })
        .transition()
          .style("opacity", opacity);
    };
  }
});