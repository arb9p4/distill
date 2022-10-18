let figName = 'fig-d3-1';

let width = 400;
let height = 300;
let size = 20;

let svg = d3.select(`div#${figName}`).append('svg');

svg.style("background-color", "#eee");
svg.style("width", width);
svg.style("height", height);

const circles = d3.range(20).map(i => ({
    x: Math.random() * (width - size * 2) + size,
    y: Math.random() * (height - size * 2) + size,
  }));


function dragstarted(event, d) {
    d3.select(this).raise().attr("stroke", "black");
}

function dragged(event, d) {
    d3.select(this).attr("x", d.x = event.x).attr("y", d.y = event.y);
}

function dragended(event, d) {
    d3.select(this).attr("stroke", null);
}

let drag = d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);


svg.selectAll("rect")
  .data(circles)
  .join("rect")
    .attr("x", d => d.x)
    .attr("y", d => d.y)
    .attr("width", size)
    .attr("height", size)
    .attr("fill", (d, i) => d3.schemeCategory10[i % 10])
    .call(drag);

