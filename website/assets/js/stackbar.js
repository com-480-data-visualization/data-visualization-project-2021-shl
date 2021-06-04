//reference http://bl.ocks.org/yuuniverse4444/8325617

var margin =  { top: 100, right: 50, bottom: 100, left: 50 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    marginOverview = { top: 430, right: margin.right, bottom: 20,  left: margin.left },
    heightOverview = 500 - marginOverview.top - marginOverview.bottom;

// set up a date parsing function for future use
var parseDate = d3.time.format("%d/%m/%Y").parse;

// some colours to use for the bars
var colours = ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c"];
    colour = d3.scale.ordinal().range(colours);
    gerne = ["Fighting Game","First-Person Shooter","Multiplayer Online Battle Arena","Sports","Strategy","Others"];
// mathematical scales for the x and y axes
var x = d3.time.scale()
                .range([0, width]);
var y = d3.scale.linear()
                .range([height, 0]);
var xOverview = d3.time.scale()
                .range([0, width]);
var yOverview = d3.scale.linear()
                .range([heightOverview, 0]);

// rendering for the x and y axes
var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");
var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left");
var xAxisOverview = d3.svg.axis()
                .scale(xOverview)
                .orient("bottom");

// something for us to render the chart into
var svg = d3.select("body")
                .append("svg") // the overall space
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom);
var main = svg.append("g")
                .attr("class", "main")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var overview = svg.append("g")
                    .attr("class", "overview")
                    .attr("transform", "translate(" + marginOverview.left + "," + marginOverview.top + ")");

// brush tool to let us zoom and pan using the overview chart
var brush = d3.svg.brush()
                    .x(xOverview)
                    .on("brush", brushed);

var legend = svg.selectAll(".legend")
    .data(colours)
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(-24," + i * 18 + ")"; });


// setup complete, let's get some data!
d3.csv("assets/data/tournament2.csv", parse, function(data) {

    // data ranges for the x and y axes
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, 600]);
    xOverview.domain(x.domain());
    yOverview.domain(y.domain());

    // data range for the bar colours
    // (essentially maps attribute names to colour values)
    colour.domain(d3.keys(data[0]));

    // draw the axes now that they are fully set up
    main.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    main.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
          .attr("transform", "rotate(0)")
          .attr("x", 25)
          .attr("y", -20)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Tournaments");

    overview.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + heightOverview + ")")
        .call(xAxisOverview);

    // draw the bars
    main.append("g")
        .attr("class", "bars")
        // a group for each stack of bars, positioned in the correct x position
        .selectAll(".bar.stack")
        .data(data)
        .enter().append("g")
        .attr("class", "bar stack")
        .attr("transform", function(d) { return "translate(" + x(d.date) + ",0)"; })
        // a bar for each value in the stack, positioned in the correct y positions
        .selectAll("rect")
        .data(function(d) { return d.counts; })
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.x); })
        .attr("width", 7)
        .attr("y", function(d) { return y(d.y1); })
        .attr("height", function(d) { return y(d.y0) - y(d.y1); })
        .style("fill", function(d) { return colour(d.name); })
        .on("mouseover", function() { tooltip.style("display", null); })
        .on("mouseout", function() { tooltip.style("display", "none"); })
        .on("mousemove", function(d) {
          var xPosition = d3.mouse(this)[0]+300 ;
          var yPosition = d3.mouse(this)[1];
          tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
          tooltip.select("text").text(d.name+": "+(d.y1-d.y0));
        });

    overview.append("g")
        .attr("class", "bars")
        .selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return xOverview(d.date) - 3; })
        .attr("width", 6)
        .attr("y", function(d) { return yOverview(d.total); })
        .attr("height", function(d) { return heightOverview - yOverview(d.total); });

    // add the brush target area on the overview chart
    overview.append("g")
      .attr("class", "x brush")
      .call(brush)
      .selectAll("rect")
      // -6 is magic number to offset positions for styling/interaction to feel right
      .attr("y", -8)
      // need to manually set the height because the brush has
      // no y scale, i.e. we should see the extent being marked
      // over the full height of the overview chart
      .attr("height", heightOverview );

    legend.append("rect")
      .attr("x", width - 10)
      .attr("width", 15)
      .attr("height", 15)
      .style("fill", function(d, i) {return colours.slice().reverse()[i];});

    legend.append("text")
      .attr("x", width + 5)
      .attr("y", 8)
      .attr("dy", ".35em")
      .style("text-anchor", "start")
      .text(function(d, i) {
        return gerne[i]});

    var tooltip = svg.append("g")
      .attr("class", "tooltip")
      .style("display", "none");

    tooltip.append("rect")
      .attr("width", 190)
      .attr("height", 30)
      .attr("fill", "yellow")
      .style("opacity", 0.5);

    tooltip.append("text")
      .attr("dx", 95)
      .attr("dy", "2em")
      .style("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("font-weight", "bold");

});

// by habit, cleaning/parsing the data and return a new object to ensure/clarify data object structure
function parse(d) {
    var value = { date: parseDate(d.date) }; // turn the date string into a date object

    // adding calculated data to each count in preparation for stacking
    var y0 = 0; // keeps track of where the "previous" value "ended"
    value.counts = gerne.map(function(name) {
        return { name: name,
                 y0: y0,
                 // add this count on to the previous "end" to create a range, and update the "previous end" for the next iteration
                 y1: y0 += +d[name]
               };
    });
    // quick way to get the total from the previous calculations
    value.total = value.counts[value.counts.length - 1].y1;
    return value;
}

// zooming/panning behaviour for overview chart
function brushed() {
    // update the main chart's x axis data range
    x.domain(brush.empty() ? xOverview.domain() : brush.extent());
    // redraw the bars on the main chart
    main.selectAll(".bar.stack")
            .attr("transform", function(d) { return "translate(" + x(d.date) + ",0)"; })
    // redraw the x axis of the main chart
    main.select(".x.axis").call(xAxis);
}
