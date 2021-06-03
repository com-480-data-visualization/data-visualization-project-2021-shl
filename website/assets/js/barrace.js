// Reference: https://bl.ocks.org/jrzief/70f1f8a5d066a286da3a1e699823470f

function whenDocumentLoaded(action) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", action);
  } else {
    // `DOMContentLoaded` already fired
    action();
  }
}

class BarRace {
  constructor(svg_element_id, data_path) {

    var svg = d3.select(svg_element_id).append("svg")
      .attr("width", 860)
      .attr("height", 500);

    var tickDuration = 1500;

    var top_n = 5;
    var height = 500;
    var width = 860;

    const margin = {
      top: 80,
      right: 0,
      bottom: 5,
      left: 50
    };

    let barPadding = (height - (margin.bottom + margin.top)) / (top_n * 5);

    let title = svg.append('text')
      .attr('class', 'title')
      .attr('y', 24)
      .html("2000-2021 Top 5 Games' Prize Pools");

    let subTitle = svg.append("text")
      .attr("class", "subTitle")
      .attr("y", 55)
      .html("Prize Pools, $");

    let year = 2000;

    d3.csv(data_path).then(function(data) {
      //if (error) throw error;

      console.log(data);

      data.forEach(d => {
        d.Earnings = +d.Earnings,
          d.lastEarnings = +d.lastEarnings,
          d.Earnings = isNaN(d.Earnings) ? 0 : d.Earnings,
          d.year = +d.year,
          d.colour = d3.hsl(Math.random() * 360, 0.75, 0.75)
      });

      console.log(data);

      let yearSlice = data.filter(d => d.year == year && !isNaN(d.Earnings))
        .sort((a, b) => b.value - a.value)
        .slice(0, top_n);

      yearSlice.forEach((d, i) => d.rank = i);

      console.log('yearSlice: ', yearSlice)

      let x = d3.scaleLinear()
        .domain([0, d3.max(yearSlice, d => d.Earnings)])
        .range([margin.left, width - margin.right - 65]);

      let y = d3.scaleLinear()
        .domain([top_n, 0])
        .range([height - margin.bottom, margin.top]);

      let xAxis = d3.axisTop()
        .scale(x)
        .ticks(width > 500 ? 5 : 2)
        .tickSize(-(height - margin.top - margin.bottom))
        .tickFormat(d => d3.format(',')(d));

      svg.append('g')
        .attr('class', 'axis xAxis')
        .attr('transform', `translate(0, ${margin.top})`)
        .call(xAxis)
        .selectAll('.tick line')
        .classed('origin', d => d == 0);

      svg.selectAll('rect.bar')
        .data(yearSlice, d => d.Game)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', x(0) + 1)
        .attr('width', d => x(d.Earnings) - x(0) - 1)
        .attr('y', d => y(d.rank) + 5)
        .attr('height', y(1) - y(0) - barPadding)
        .style('fill', d => d.colour);

      svg.selectAll('text.label')
        .data(yearSlice, d => d.Game)
        .enter()
        .append('text')
        .attr('class', 'label')
        .attr('x', d => x(d.Earnings) - 8)
        .attr('y', d => y(d.rank) + 5 + ((y(1) - y(0)) / 2) + 1)
        .style('text-anchor', 'end')
        .html(d => d.Game);

      svg.selectAll('text.valueLabel')
        .data(yearSlice, d => d.Game)
        .enter()
        .append('text')
        .attr('class', 'valueLabel')
        .attr('x', d => x(d.Earnings) + 1)
        .attr('y', d => y(d.rank) + 5 + ((y(1) - y(0)) / 2) + 1)
        .text(d => d3.format(',.0f')(d.Earnings));

      let yearText = svg.append('text')
        .attr('class', 'yearText')
        .attr('x', width - margin.right)
        .attr('y', height - 25)
        .style('text-anchor', 'end')
        .html(~~year)
        .call(halo, 10);

      let ticker = d3.interval(e => {

        yearSlice = data.filter(d => d.year == year && !isNaN(d.Earnings))
          .sort((a, b) => b.value - a.value)
          .slice(0, top_n);

        yearSlice.forEach((d, i) => d.rank = i);

        //console.log('IntervalYear: ', yearSlice);

        x.domain([0, d3.max(yearSlice, d => d.Earnings)]);

        svg.select('.xAxis')
          .transition()
          .duration(tickDuration)
          .ease(d3.easeLinear)
          .call(xAxis);

        let bars = svg.selectAll('.bar').data(yearSlice, d => d.Game);

        bars
          .enter()
          .append('rect')
          .attr('class', d => `bar ${d.Game.replace(/\s/g,'_')}`)
          .attr('x', x(0) + 1)
          .attr('width', d => x(d.Earnings) - x(0) - 1)
          .attr('y', d => y(top_n + 1) + 5)
          .attr('height', y(1) - y(0) - barPadding)
          .style('fill', d => d.colour)
          .transition()
          .duration(tickDuration)
          .ease(d3.easeLinear)
          .attr('y', d => y(d.rank) + 5);

        bars
          .transition()
          .duration(tickDuration)
          .ease(d3.easeLinear)
          .attr('width', d => x(d.Earnings) - x(0) - 1)
          .attr('y', d => y(d.rank) + 5);

        bars
          .exit()
          .transition()
          .duration(tickDuration)
          .ease(d3.easeLinear)
          .attr('width', d => x(d.Earnings) - x(0) - 1)
          .attr('y', d => y(top_n + 1) + 5)
          .remove();

        let labels = svg.selectAll('.label')
          .data(yearSlice, d => d.Game);

        labels
          .enter()
          .append('text')
          .attr('class', 'label')
          .attr('x', d => x(d.Earnings) - 8)
          .attr('y', d => y(top_n + 1) + 5 + ((y(1) - y(0)) / 2))
          .style('text-anchor', 'end')
          .html(d => d.Game)
          .transition()
          .duration(tickDuration)
          .ease(d3.easeLinear)
          .attr('y', d => y(d.rank) + 5 + ((y(1) - y(0)) / 2) + 1);


        labels
          .transition()
          .duration(tickDuration)
          .ease(d3.easeLinear)
          .attr('x', d => x(d.Earnings) - 8)
          .attr('y', d => y(d.rank) + 5 + ((y(1) - y(0)) / 2) + 1);

        labels
          .exit()
          .transition()
          .duration(tickDuration)
          .ease(d3.easeLinear)
          .attr('x', d => x(d.Earnings) - 8)
          .attr('y', d => y(top_n + 1) + 5)
          .remove();



        let valueLabels = svg.selectAll('.valueLabel').data(yearSlice, d => d.Game);

        valueLabels
          .enter()
          .append('text')
          .attr('class', 'valueLabel')
          .attr('x', d => x(d.Earnings) + 1)
          .attr('y', d => y(top_n + 1) + 5)
          .text(d => d3.format(',.0f')(d.Earnings))
          .transition()
          .duration(tickDuration)
          .ease(d3.easeLinear)
          .attr('y', d => y(d.rank) + 5 + ((y(1) - y(0)) / 2) + 1);

        valueLabels
          .transition()
          .duration(tickDuration)
          .ease(d3.easeLinear)
          .attr('x', d => x(d.Earnings) + 1)
          .attr('y', d => y(d.rank) + 5 + ((y(1) - y(0)) / 2) + 1)
          .tween("text", function(d) {
            let i = d3.interpolateRound(d.lastEarnings, d.Earnings);
            return function(t) {
              this.textContent = d3.format(',')(i(t));
            };
          });


        valueLabels
          .exit()
          .transition()
          .duration(tickDuration)
          .ease(d3.easeLinear)
          .attr('x', d => x(d.Earnings) + 1)
          .attr('y', d => y(top_n + 1) + 5)
          .remove();

        yearText.html(~~year);

        if (year == 2021) ticker.stop();
        year = year+1;
      }, tickDuration);

    });

    const halo = function(text, strokeWidth) {
      text.select(function() {
          return this.parentNode.insertBefore(this.cloneNode(true), this);
        })
        .style('fill', '#ffffff')
        .style('stroke', '#ffffff')
        .style('stroke-width', strokeWidth)
        .style('stroke-linejoin', 'round')
        .style('opacity', 1);

    }
  }
}

whenDocumentLoaded(() => {
  let plot = new BarRace('#my_barrace', 'assets/data/yearlyEarning.csv');
});

d3.select("#replay")
  .on("click", function() {
    location.reload()
  })
