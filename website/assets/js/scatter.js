/*
	Refrences:
  Exercise 04 Solution (https://moodle.epfl.ch/course/view.php?id=15487)
	d3 Gallery: https://www.d3-graph-gallery.com/graph/bubble_tooltip.html
*/

function whenDocumentLoaded(action) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", action);
  } else {
    // `DOMContentLoaded` already fired
    action();
  }
}

class ScatterPlot {
  constructor(svg_element_id, data_path) { // set the dimensions and margins of the graph
    var margin = {
        top: 20,
        right: 330,
        bottom: 20,
        left: 100
      },
      width = 1200 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;
    // append the svg object to the body of the page
    var tooltip = d3.select(svg_element_id)
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style("color", "white")

    var svg = d3.select(svg_element_id)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    //Read the data
    d3.csv(data_path, function(data) {

      // ---------------------------//
      //       AXIS  AND SCALE      //
      // ---------------------------//
      // var x = d3.scaleTime()
      //   .domain(d3.extent(data, function(d) {
      //     return new Date(parseInt(d.ReleaseYear), 0)
      //   }));

  function updatey(choice){
      svg.selectAll("*").remove();
      var x = d3.scaleTime()
        .domain(d3.extent(data, function(d) {
          return new Date(parseInt(d.ReleaseYear), 0)
        }))
        .range([0, width]);

      var minYear = d3.min(data, d => d.ReleaseYear);
      var maxYear = d3.max(data, d => d.ReleaseYear);
      var numYears = maxYear - minYear;

      var xAxis = d3.axisBottom(x).ticks(numYears);
      var gX = svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

      // Add X axis label:
      svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height + 50)
        .text("Release Year");

      // Add Y axis
      // Taking log of Earnings to avoid the overlapping of circles
      // Using clamp() to deal with data vith value 0.
      var y = d3.scaleLog()
        .clamp(true)
        .domain([0.1, 214390395]).nice()
        .range([height, 0]);


      var yAxis = d3.axisLeft(y).tickFormat(function f(d) {
        return d3.format('$,s')(d.toPrecision(1));
      })

      var gY = svg.append("g")
        .call(yAxis);

      var z = d3.scaleSqrt()
        .domain(d3.extent(data, function(d) {
          return +d.TotalGames
        }))
        .range([4, 40]);


      var game_categories = ['Fighting Game', 'First-Person Shooter', 'Sports', 'Strategy', 'Racing',
        'Collectible Card Game', 'Multiplayer Online Battle Arena', 'Role-Playing Game', 'Third-Person Shooter', 'Puzzle Game', 'Battle Royale'
      ]
      // Add a scale for bubble color
      var myColor = d3.scaleOrdinal()
        .domain(game_categories)
        .range(d3.schemeSpectral[11]);



      // ---------------------------//
      //      TOOLTIP               //
      // ---------------------------//

      // -1- Create a tooltip div that is hidden by default:

      // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
      var showTooltip = function(d) {
        tooltip
          .transition()
          .duration(200)
        tooltip
          .style("opacity", 1)
          .style("left", (d3.mouse(this)[0] + 50) + "px")
          .style("top", (d3.mouse(this)[1] + 50) + "px")
          .html('<ul class="list-group"><li class="list-group-item"><b> Game Category: </b>' + d.Genre + '</li>' +
            '<li class="list-group-item"> <b>Release Year: </b>' + d.ReleaseYear + '</li>' +
            '<li class="list-group-item"> <b>Total Tounament Prizepool: </b>$' + d.TotalEarnings + '</li>' +
            '<li class="list-group-item"> <b>Online Tounament Prizepool: </b>$' + d.OnlineEarnings + '</li>' +
            '<li class="list-group-item"> <b>Number of Games:</b>' + d.TotalGames + '</li></ul>')
      }

      var moveTooltip = function(d) {
        tooltip
          .style("left", (d3.mouse(this)[0] + 150) + "px")
          .style("top", (d3.mouse(this)[1] + 100) + "px")
      }
      var hideTooltip = function(d) {
        tooltip
          .transition()
          .duration(200)
          .style("opacity", 0)
      }


      // ---------------------------//
      //       HIGHLIGHT GROUP      //
      // ---------------------------//

      // What to do when one group is hovered
      var highlight = function(d) {
        // reduce opacity of all groups
        d3.selectAll(".bubbles").style("opacity", .05)
        // expect the one that is hovered
        d3.selectAll("." + d).style("opacity", 1)
      }

      // And when it is not hovered anymore
      var noHighlight = function(d) {
        d3.selectAll(".bubbles").style("opacity", 1)
      }
      // Pan and zoom
      var zoom = d3.zoom()
        .scaleExtent([0.5, 20])
        .extent([
          [0, 0],
          [width, height]
        ])
        .on("zoom", zoomed);

      svg.append("rect")
        .attr("width", width + 200)
        .attr("height", height)
        .style("fill", "none")
        .style("pointer-events", "all")
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
        .call(zoom);

      // ---------------------------//
      //       CIRCLES              //
      // ---------------------------//
      svg.append("defs").append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", width)
        .attr("height", height);

      var points_g = svg.append("g")
        .attr("clip-path", "url(#clip)")
        .classed("points_g", true);
      // Add dots
      var points = points_g
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", function(d) {
          return "bubbles " + d.Genre
        })
        .attr("cx", function(d) {
          return x(new Date(parseInt(d.ReleaseYear), 0));
        })
        .attr("cy", function(d) {
          return y(d[choice]);
        })
        .attr("r", function(d) {
          return z(d.TotalGames);
        })
        .style("fill", function(d) {
          return myColor(d.Genre);
        })
        // -3- Trigger the functions for hover
        .on("mouseover", showTooltip)
        .on("mousemove", moveTooltip)
        .on("mouseleave", hideTooltip)




      function zoomed() {
        // create new scale ojects based on event
        var new_xScale = d3.event.transform.rescaleX(x);
        var new_yScale = d3.event.transform.rescaleY(y);
        // update axes
        gX.call(xAxis.scale(new_xScale));
        gY.call(yAxis.scale(new_yScale));
        points.data(data)
          .attr('cx', function(d) {
            return new_xScale(new Date(parseInt(d.ReleaseYear), 0))
          })
          .attr('cy', function(d) {
            return new_yScale(d[choice])
          })
      }

      // ---------------------------//
      //       LEGEND              //
      // ---------------------------//

      // Add legend: circles
      var valuesToShow = [10000000, 100000000, 1000000000]
      var xCircle = 390
      var xLabel = 440

      // Add one dot in the legend for each name.
      var size = 20
      svg.selectAll("myrect")
        .data(game_categories)
        .enter()
        .append("circle")
        .attr("cx", width + 70)
        .attr("cy", function(d, i) {
          return i * (size + 5) + (size / 2)
        })
        .attr("r", 7)
        .style("fill", function(d) {
          return myColor(d)
        })


      // Add labels beside legend dots
      svg.selectAll("mylabels")
        .data(game_categories)
        .enter()
        .append("text")
        .attr("x", width + 70 + size * .8)
        .attr("y", function(d, i) {
          return i * (size + 5) + (size / 2)
        }) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", function(d) {
          return myColor(d)
        })
        .text(function(d) {
          return d
        })
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
      }
      //
      updatey("AdjustedOnline")
      d3.selectAll("button.btn-yaxi").on("click", function(){
        d3.selectAll('button.btn-yaxi').classed('active', false);
        var btn = d3.select(this);
        btn.classed('active', true);
        updatey(this.value)
      });
    })

  }
}
whenDocumentLoaded(() => {
  let plot = new ScatterPlot('#my_dataviz', 'assets/data/gamecategory.csv');
});
