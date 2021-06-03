
d3.json("https://raw.githubusercontent.com/com-480-data-visualization/data-visualization-project-2021-shl/master/website/assets/js/visuYear.json",function(error, data) {
  if (error) throw error;
  console.log(data);
  var svg = d3.select("#circleP").append("svg")
	.attr("width", 600 )
	.attr("height", 600),
    margin = 20,
    diameter = +svg.attr("width"),
    g = svg.append("g").attr("transform", "translate(" + diameter/ 2 + "," + diameter / 2 + ")");

  var color = d3.scaleLinear()
    .domain([-1, 5])
    .range(["hsl(205,80%,80%)", "hsl(228,30%,40%)"])
    .interpolate(d3.interpolateHcl);

  var pack = d3.pack()
    .size([diameter - margin, diameter - margin])
    .padding(2);
  
	  
  var allGroup = ['1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021']
  // add the options to the button
   d3.select("#selectButton")
     .selectAll('myOptions')
     .data(allGroup)
     .enter()
     .append('option')
     .text(function (d) { return d; }) // text showed in the menu
     .attr("value", function (d) { return d; }) // corresponding value returned by the button
  
  var idx = 0;
  root = d3.hierarchy(data.children[idx])
		  .sum(function(d) { return d.size; })
		  .sort(function(a, b) { return b.value - a.value; });

  var focus = root,
		  nodes = pack(root).descendants(),
		  view;
  
  
  var circle = g.selectAll("circle")
    .data(nodes)
    .enter().append("circle")
      .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
      .style("fill", function(d) { return d.children ? color(d.depth) : null; })
      .on("click", function(d) { if (focus !== d) zoom(d), d3.event.stopPropagation(); });
	

  var text = g.selectAll("text")
    .data(nodes)
    .enter().append("text")
      .attr("class", "label")
      .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
      .style("display", function(d) { return d.parent === root ? "inline" : "none"; })
      .text(function(d) { return d.data.name; });

  var node = g.selectAll("circle,text");

  svg
      .style("background", color(-1))
      .on("click", function() { zoom(root); });

  zoomTo([root.x, root.y, root.r * 2 + margin]);

  function zoom(d) {
    var focus0 = focus; focus = d;

    var transition = d3.transition()
        .duration(d3.event.altKey ? 7500 : 750)
        .tween("zoom", function(d) {
          var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
          return function(t) { zoomTo(i(t)); };
        });

    transition.selectAll("text")
      .filter(function(d) { return d.parent === focus || this.style.display === "inline" ; })
        .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
		.on("start", function(d) { if (d.parent == focus) this.style.display = "inline"; })
        .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
        //.on("start", function(d) { if (d.parent == focus  && d.data.size>10) this.style.display = "inline"; })
        //.on("end", function(d) { if (d.parent !== focus && d.data.size<=10) this.style.display = "none"; });
  }

  function zoomTo(v) {
    var k = diameter / v[2]; view = v;
    node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
    circle.attr("r", function(d) { return d.r * k; });
  }
  
  function update(selectedGroup) {
	 
	d3.select("#circleP").select("svg").remove();
	d3.select("#selectButton").select("option").remove();  
	
	var svg = d3.select("#circleP").append("svg")
	.attr("width", 600 )
	.attr("height", 600),
    margin = 20,
    diameter = +svg.attr("width"),
    g = svg.append("g").attr("transform", "translate(" + diameter/ 2 + "," + diameter / 2 + ")");

  var color = d3.scaleLinear()
    .domain([-1, 5])
    .range(["hsl(205,80%,80%)", "hsl(228,30%,40%)"])
    .interpolate(d3.interpolateHcl);

  var pack = d3.pack()
    .size([diameter - margin, diameter - margin])
    .padding(2);
	  
  // add the options to the button
   d3.select("#selectButton")
     .selectAll('myOptions')
     .data(allGroup)
     .enter()
     .append('option')
     .text(function (d) { return d; }) // text showed in the menu
     .attr("value", function (d) { return d; }) // corresponding value returned by the button
  	 
  var idx = allGroup.indexOf(selectedGroup);
  var root = d3.hierarchy(data.children[idx])
		  .sum(function(d) { return d.size; })
		  .sort(function(a, b) { return b.value - a.value; });

  var focus = root,
		  nodes = pack(root).descendants(),
		  view;
  
  
  var circle = g.selectAll("circle")
    .data(nodes)
    .enter().append("circle")
      .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
      .style("fill", function(d) { return d.children ? color(d.depth) : null; })
      .on("click", function(d) { if (focus !== d) zoom(d), d3.event.stopPropagation(); });
	

  var text = g.selectAll("text")
    .data(nodes)
    .enter().append("text")
      .attr("class", "label")
      .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
      .style("display", function(d) { return d.parent === root ? "inline" : "none"; })
      .text(function(d) { return d.data.name; });

  var node = g.selectAll("circle,text");

  svg
      .style("background", color(-1))
      .on("click", function() { zoom(root); });

  zoomTo([root.x, root.y, root.r * 2 + margin]);

  function zoom(d) {
    var focus0 = focus; focus = d;

    var transition = d3.transition()
        .duration(d3.event.altKey ? 7500 : 750)
        .tween("zoom", function(d) {
          var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
          return function(t) { zoomTo(i(t)); };
        });

    transition.selectAll("text")
      .filter(function(d) { return d.parent === focus || this.style.display === "inline" ; })
        .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
		.on("start", function(d) { if (d.parent == focus) this.style.display = "inline"; })
        .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
        //.on("start", function(d) { if (d.parent == focus  && d.data.size>10) this.style.display = "inline"; })
        //.on("end", function(d) { if (d.parent !== focus && d.data.size<=10) this.style.display = "none"; });
  }

  function zoomTo(v) {
    var k = diameter / v[2]; view = v;
    node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
    circle.attr("r", function(d) { return d.r * k; });
  }
  }
  // When the button is changed, run the updateChart function
  d3.select("#selectButton").on("change", function(d) {
	// recover the option that has been chosen
	var selectedOption = d3.select(this).property("value")
    // run the updateChart function with this selected option
    update(selectedOption)
    })
});
