var movieMatrix = [[],[],[],[],[],[],[],[],[],[]
                  ,[],[],[],[],[],[],[],[],[],[]];
var svg;
var fill;

function createChart(matrix) {

  var chord = d3.layout.chord()
      .padding(0.025)
      .matrix(matrix);

  var width = 1000,
      height = 800,
      innerRadius = 200,
      outerRadius = innerRadius * 1.25;

  fill = d3.scale.ordinal()
      .domain(d3.range(20))
      .range(['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a'
        ,'#8dd3c7','#ffffb3','#bebada','#fb8072','#80b1d3','#fdb462','#b3de69','#fccde5','#d9d9d9','#bc80bd']);

  svg = d3.select("#chart").append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ") rotate(-90)");

//create inner black circle
  var innerCircle = svg.append("circle")
      .attr("r", innerRadius)
      .attr("fill", "#333");

//creates the height of the sections
  var arcs = svg.append("g").selectAll("path")
      .data(chord.groups);

  var paths = arcs.enter().append("path")
      .style("fill", function(d) { return fill(d.index); })
      .style("stroke", function(d) { return fill(d.index); })
      // .attr("d", d3.svg.arc().innerRadius(outerRadius).outerRadius(function(d) { return outerRadius + d.value * 1.5; }))
      .attr("d", d3.svg.arc().innerRadius(innerRadius).outerRadius(function(d) { return innerRadius + (d.value * 3); }))
      .on("click", fade(.1))
      .on("mouseover", function(d) { displayInfo(d); })
      .on("mouseout", fade(1));

  svg.append("g").selectAll("text")
      .data(chord.groups)
    .enter()
    .append("text")
      .each(function(d) { 
        d.angle = (d.startAngle + d.endAngle) / 2;
        d.distance = innerRadius + ((d.value + 3) * 3); 
      })
      .attr("dy", ".35em")
      .attr("text-anchor", function(d) { return (d.angle < (Math.PI/2) || d.angle > (3 * Math.PI/2)) ? "end" : null; })
      .attr("transform", function(d) {
        return "rotate(" + ((d.angle * 180 / Math.PI) - 90) + ")"
            + "translate(" + (d.distance + 10) + ")"
            + (d.angle < (Math.PI/2) ? "rotate(180)" : "")
            + (d.angle > (3 * Math.PI/2) ? "rotate(180)" : "");
      })
      .attr("font-size", "15px")
      .style("fill", function(d) { return fill(d.index); })
      .text(function(d) { console.log(matrixList[d.index]); return matrixList[d.index]; });

//creates the inner circle
  // svg.append("g").selectAll("path")
  //     .data(chord.groups)
  //   .enter().append("path")
  //     .style("fill", function(d) { return "ffffff"; })
  //     .style("stroke", function(d) { return fill(d.index); })
  //     .attr("d", d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius))
  //     .on("mouseover", fade(.1))
  //     .on("mouseout", fade(1));

//creates the chords
  svg.append("g")
      .attr("class", "chord")
    .selectAll("path")
      .data(chord.chords)
    .enter().append("path")
      .attr("d", d3.svg.chord().radius(innerRadius))
      .style("fill", function(d) { return fill(d.source.index); })
      .style("stroke", function(d) { return "white";})
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
}

function displayInfo(d) {
  console.log(d);
  console.log(matrixList[d.index]);
}

function swapColors(option) {
    svg.selectAll(".chord path")
      .style("fill", function(d) { 
        if (option == "target") {
          return fill(d.target.index)
        } else {
          return fill(d.source.index);
        }
      });
  }

function updateChart() {

}