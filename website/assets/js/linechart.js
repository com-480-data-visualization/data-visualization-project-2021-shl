var main_margin = {top: 20, right: 80, bottom: 100, left: 40},
    mini_margin = {top: 430, right: 80, bottom: 20, left: 40},
    main_width = 960 - main_margin.left - main_margin.right,
    main_height = 500 - main_margin.top - main_margin.bottom,
    mini_height = 500 - mini_margin.top - mini_margin.bottom;

var formatDate = d3.time.format("%m/%Y"),
    parseDate = formatDate.parse,
    bisectDate = d3.bisector(function(d) { return d.Date; }).left,
    formatOutput0 = function(d) { return formatDate(d.Date) + ": " + d.Tournaments + " Tournaments"; },
    formatOutput1 = function(d) { return formatDate(d.Date) + ": " + d.Earnings+ " Earnings"; };

var main_x = d3.time.scale()
    .range([0, main_width]),
    mini_x = d3.time.scale()
    .range([0, main_width]);

var main_y0 = d3.scale.sqrt()
    .range([main_height, 0]),
    main_y1 = d3.scale.sqrt()
    .range([main_height, 0]),
    mini_y0 = d3.scale.sqrt()
    .range([mini_height, 0]),
    mini_y1 = d3.scale.sqrt()
    .range([mini_height, 0]);

var main_xAxis = d3.svg.axis()
    .scale(main_x)
    .tickFormat(d3.time.format("%m/%Y"))
    .orient("bottom"),
    mini_xAxis = d3.svg.axis()
    .scale(mini_x)
    .tickFormat(d3.time.format("%m/%Y"))
    .orient("bottom");

var main_yAxisLeft = d3.svg.axis()
    .scale(main_y0)
    .orient("left");
    main_yAxisRight = d3.svg.axis()
    .scale(main_y1)
    .orient("right");
/*
* ========================================================================
*  Plotted line variables
* ========================================================================
*/

var main_line0 = d3.svg.line()
    .interpolate("cardinal")
    .x(function(d) { return main_x(d.Date); })
    .y(function(d) { return main_y0(d.Tournaments); });

var main_line1 = d3.svg.line()
    .interpolate("cardinal")
    .x(function(d) { return main_x(d.Date); })
    .y(function(d) { return main_y1(d.Earnings); });

var mini_line0 = d3.svg.line()
    .x(function(d) { return mini_x(d.Date); })
    .y(function(d) { return mini_y0(d.Tournaments); });

var mini_line1 = d3.svg.line()
    .x(function(d) { return mini_x(d.Date); })
    .y(function(d) { return mini_y1(d.Earnings); });
/*
* ========================================================================
*  Variables for brushing and zooming behaviour
* ========================================================================
*/
var brush = d3.svg.brush()
    .x(mini_x)
    .on("brushend", brush);


// var zoom = d3.behavior.zoom()
//     .on("zoom", draw)
//     .on("zoomend", brush);

/*
* ========================================================================
*  Define the SVG area ("svg") and append all the layers
* ========================================================================
*/

var svg = d3.select("body").append("svg")
    .attr("width", main_width + main_margin.left + main_margin.right)
    .attr("height", main_height + main_margin.top + main_margin.bottom);

svg.append("defs").append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("width", main_width)
    .attr("height", main_height);

var main = svg.append("g")
    .attr("transform", "translate(" + main_margin.left + "," + main_margin.top + ")");

var mini = svg.append("g")
    .attr("transform", "translate(" + mini_margin.left + "," + mini_margin.top + ")");

var display_range_group = svg.append("g")
        .attr("id", "buttons_group")
        .attr("transform", "translate(" + 0 + ","+ 0 +")");

var expl_text = display_range_group.append("text")
      .text("Data from: ")
    .style("text-anchor", "start")
    .attr("transform", "translate(" + 110 + ","+ 15 +")");



d3.csv("assets/data/tournaments_earnings.csv", function(error, data) {
  data.forEach(function(d) {
    d.Date = parseDate(d.Date);
    d.Tournaments = +d.Tournaments;
    d.Earnings = +d.Earnings;
  });

  // data.sort(function(a, b) {
  //   return a.Date - b.Date;
  // });
  var dataXrange = d3.extent(data, function(d) { return d.Date; });
  var covidDate = [data[data.length - 20].Date, data[data.length - 1].Date];
  var fiveYrsDate = [data[data.length - 75].Date, data[data.length - 1].Date];
  var tenYrsDate = [data[data.length - 123].Date, data[data.length - 1].Date];
  var initalDate = [dataXrange[0],dataXrange[1]];

  main_x.domain([data[0].Date, data[data.length - 1].Date]);
  main_y0.domain(d3.extent(data, function(d) { return d.Tournaments; }));
  //main_y0.domain([0.1, d3.max(data, function(d) { return d.Tournaments; })]);
  main_y1.domain(d3.extent(data, function(d) { return d.Earnings; }));
  mini_x.domain(main_x.domain());
  mini_y0.domain(main_y0.domain());
  mini_y1.domain(main_y1.domain());

  main.append("path")
      .datum(data)
      .attr("clip-path", "url(#clip)")
      .attr("class", "line line0")
      .attr("d", main_line0);

  main.append("path")
      .datum(data)
      .attr("clip-path", "url(#clip)")
      .attr("class", "line line1")
      .attr("d", main_line1);

  main.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + main_height + ")")
      .call(main_xAxis);

  main.append("g")
      .attr("class", "y axis axisLeft")
      .call(main_yAxisLeft)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Tournaments");

  main.append("g")
      .attr("class", "y axis axisRight")
      .attr("transform", "translate(" + main_width + ", 0)")
      .call(main_yAxisRight)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -12)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Earnings");

  mini.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + mini_height + ")")
      .call(main_xAxis);

  mini.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", mini_line0);

  mini.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", mini_line1);

  mini.append("g")
      .attr("class", "x brush")
      .call(brush)
    .selectAll("rect")
      .attr("y", -6)
      .attr("height", mini_height + 7);

/* === brush (part of context chart)  === */

  brush.extent(initalDate)
  brush(d3.select(".brush").transition());

  var focus = main.append("g")
      .attr("class", "focus")
      .style("display", "none");

  display_range_group.append("text")
      .attr("id", "displayDates")
      .text(formatDate(dataXrange[0]) + " - " + formatDate(dataXrange[1]))
      .style("text-anchor", "start")
      .attr("transform", "translate(" + 180 + ","+ 15 +")");

  var expl_text = display_range_group.append("text")
      .text("Zoom to: ")
      .style("text-anchor", "start")
      .attr("transform", "translate(" + 310 + ","+ 15  +")");

// === the zooming/scaling buttons === //

  var button_width = 90;
  var button_height = 24;

  var button_data =["Covid Period","2015-2021","2011-2021","Whole Period"];

  var button = display_range_group.selectAll("g")
      .data(button_data)
      .enter().append("g")
      .attr("class", "scale_button")
      .attr("transform", function(d, i) { return "translate(" + (370 + i*button_width + i*20) + ",0)"; })
      .on("click", scaleDate);

//button rectangle
  button.append("rect")
      .attr("width", button_width)
      .attr("height", button_height)
      .attr("rx", 1)
      .attr("ry", 1);

//text in  button
  button.append("text")
      .attr("dy", (button_height/2 + 3))
      .attr("dx", button_width/2)
      .style("text-anchor", "middle")
      .text(function(d) { return d; });

/* === focus chart === */
// Earningseige auf der Zeitleiste
  focus.append("line")
      .attr("class", "x")
      .attr("y1", main_y0(0) - 6)
      .attr("y2", main_y0(0) + 6)

  // Earningseige auf der linken Leiste
  focus.append("line")
      .attr("class", "y0")
      .attr("x1", main_width - 6) // nach links
      .attr("x2", main_width + 6); // nach rechts

  // Earningseige auf der rechten Leiste
  focus.append("line")
      .attr("class", "y1")
      .attr("x1", main_width - 6)
      .attr("x2", main_width + 6);

  focus.append("circle")
      .attr("class", "y0")
      .attr("r", 4);

  focus.append("text")
      .attr("class", "y0")
      .attr("dy", "-1em");

  focus.append("circle")
      .attr("class", "y1")
      .attr("r", 4);

  focus.append("text")
      .attr("class", "y1")
      .attr("dy", "-1em");

  main.append("rect")
      .attr("class", "overlay")
      .attr("width", main_width)
      .attr("height", main_height)
      .on("mouseover", function() { focus.style("display", null); })
      .on("mouseout", function() { focus.style("display", "none"); })
      .on("mousemove", mousemove);

  // zoom.x(main_x);
  function mousemove() {
    var x0 = main_x.invert(d3.mouse(this)[0]),
        i = bisectDate(data, x0, 1),
        d0 = data[i - 1],
        d1 = data[i],
        d = x0 - d0.Date > d1.Date - x0 ? d1 : d0;
    focus.select("circle.y0").attr("transform", "translate(" + main_x(d.Date) + "," + main_y0(d.Tournaments) + ")");
    focus.select("text.y0").attr("transform", "translate(" + main_x(d.Date)*0.85 + "," + main_y0(d.Tournaments) + ")").text(formatOutput0(d));
    focus.select("circle.y1").attr("transform", "translate(" + main_x(d.Date) + "," + main_y1(d.Earnings) + ")");
    focus.select("text.y1").attr("transform", "translate(" + main_x(d.Date)*0.85 + "," + main_y1(d.Earnings) + ")").text(formatOutput1(d));
    focus.select(".x").attr("transform", "translate(" + main_x(d.Date) + ",-9)");
    focus.select(".y0").attr("transform", "translate(" + main_width * -1 + ", " + main_y0(d.Tournaments) + ")").attr("x2", main_width + main_x(d.Date));
    focus.select(".y1").attr("transform", "translate(0, " + main_y1(d.Earnings) + ")").attr("x1", main_x(d.Date));
  }



  function scaleDate(d,i) {
  // action for buttons that scale focus to certain time interval
      var b = brush.extent();

      if ( d == "Whole Period")  {
          brush.extent(initalDate);
      }
      else if (d == "Covid Period") {
        brush.extent(covidDate);
      }
      else if (d == "2015-2021") {
        brush.extent(fiveYrsDate);
      }
      else if (d == "2011-2021") {
        brush.extent(tenYrsDate);
      }



      // now draw the brush to match our extent
      brush(d3.select(".brush").transition());
      // now fire the brushstart, brushmove, and brushend events
      brush.event(d3.select(".brush").transition());
  };

});

function brush() {
  main_x.domain(brush.empty() ? mini_x.domain() : brush.extent());
  main.select(".line0").attr("d", main_line0);
  main.select(".line1").attr("d", main_line1);
  main.select(".x.axis").call(main_xAxis);
  // Reset zoom scale's domain
    // zoom.x(main_x);
    updateDisplayDates();
    // setYdomain();
}

function updateDisplayDates() {

    var b = brush.extent();
    // update the text that shows the range of displayed dates
    var localBrushDateStart = (brush.empty()) ? formatDate(dataXrange[0]) : formatDate(b[0]),
        localBrushDateEnd   = (brush.empty()) ? formatDate(dataXrange[1]) : formatDate(b[1]);

    // Update start and end dates in upper right-hand corner
    d3.select("#displayDates")
        .text(localBrushDateStart == localBrushDateEnd ? localBrushDateStart : localBrushDateStart + " - " + localBrushDateEnd);
};
