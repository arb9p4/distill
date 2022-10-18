let figName = 'fig-d3-1';


let width = document.getElementById(figName).clientWidth,
    height = 300,
    box_size = 30,
    margin = {
        top: 20, right: 30, bottom: 30, left: 40
    };
    

let svg = d3.select(`div#${figName}`).append('svg');

svg.style("background-color", "#eee");
svg.style("width", width);
svg.style("height", height);

let x = d3.scaleLinear()
    .domain([-10, 10])
    .range([margin.left, width - margin.right]);

let y = d3.scaleLinear()
    .domain([-10, 10])
    .range([height - margin.bottom, margin.top]);

const boxes = d3.range(4).map(i => ({
    x: Math.random() * (width - box_size * 2) + box_size,
    y: Math.random() * (height - box_size * 2) + box_size,
    i: i
  }));


function dragstarted(event, d) {
    d3.select(this).raise().attr("stroke", "black");
}

function dragged(event, d) {
    d3.select(this).attr("x", d.x = event.x).attr("y", d.y = event.y);
    // console.log(`${d.i} ${event.x} ${event.y}`);
    console.log(this);
}

function dragended(event, d) {
    d3.select(this).attr("stroke", null);
}

let drag = d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);


svg.selectAll("rect")
  .data(boxes)
  .join("rect")
    .attr("x", d => d.x)
    .attr("y", d => d.y)
    .attr("width", box_size)
    .attr("height", box_size)
    .attr("fill", (d, i) => d3.schemeCategory10[i % 10])
    .call(drag);

