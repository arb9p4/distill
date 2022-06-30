import * as d3 from "https://cdn.skypack.dev/d3@7";

function main() {

    const div = d3.select("#fig1")
        .style("background-color", "#EEEEEE")
        .style("font", "10px sans-serif")
        .style("text-align", "right")
        .style("color", "white");
;

    var data = [4, 8, 15, 16, 23, 42];
    var width = 420;
    var x = d3.scaleLinear()
        .domain([0, d3.max(data)])
        .range([0, width])
    
    var y = d3.scaleBand()
        .domain(d3.range(data.length))
        .range([0, 20 * data.length])
    
    div.selectAll("div")
        .data(data)
        .join("div")
        .style("background", "steelblue")
        .style("padding", "3px")
        .style("margin", "1px")
        .style("width", d => `${d * 10}px`)
        .text(d => d);
    
        const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", y.range()[1])
      .attr("font-family", "sans-serif")
      .attr("font-size", "10")
      .attr("text-anchor", "end");

  const bar = svg.selectAll("g")
    .data(data)
    .join("g")
      .attr("transform", (d, i) => `translate(0,${y(i)})`);

  bar.append("rect")
      .attr("fill", "steelblue")
      .attr("width", x)
      .attr("height", y.bandwidth() - 1);

  bar.append("text")
      .attr("fill", "white")
      .attr("x", d => x(d) - 3)
      .attr("y", (y.bandwidth() - 1) / 2)
      .attr("dy", "0.35em")
      .text(d => d);

}

main();