$(document).ready(function() {
  var matrix = [
    [11975,  5871, 8916, 2868],
    [ 1951, 10048, 2060, 6171],
    [ 8010, 16145, 8090, 8045],
    [ 1013,   990,  940, 6907]
  ];

  var chord = d3.layout.chord()
      .sortSubgroups(d3.descending)
      .matrix(matrix);

  var width = 960,
      height = 720,
      innerRadius = 150,
      outerRadius = innerRadius * 1.1;

  var fill = d3.scale.ordinal()
      .domain(d3.range(4))
      .range(["#000000", "#FFDD89", "#957244", "#F26223"]);

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
      .attr("d", d3.svg.arc().innerRadius(innerRadius).outerRadius(function(d) { return outerRadius + Math.random() * 100}))
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