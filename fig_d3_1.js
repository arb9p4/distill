let figName = 'fig-d3-1';


let width = document.getElementById(figName).clientWidth;
let height = 300;
let box_size = 30;
let margin = {
    top: 20, right: 30, bottom: 30, left: 40
};

let b1 = {
    x: [50, 280],
    y: [40, 170],
    color: d3.schemeCategory10[0]
};

let b2 = {
    x: [150, 330],
    y: [140, 270],
    color: d3.schemeCategory10[1]
};




let svg = d3.select(`div#${figName}`).append('svg');

svg.style("background-color", "#eee");
svg.style("width", width);
svg.style("height", height);

// Clear the control handles when clicking on the background (mainly for mobile)
let controls = [];
function clearCtrl(event) {
    controls.map(ctrl => ctrl.transition().attr('opacity', 0));
}
svg.on('click', clearCtrl);


let plot_outer_height = 150;
let plot_margins = {
    top: 20, right: 30, bottom: 30, left: 40
};
let plot_width = width - plot_margins.left - plot_margins.right;
let plot_height = plot_outer_height - plot_margins.top - plot_margins.bottom;

let plots = d3.select(`div#${figName}`).append('svg')
              .attr("background-color", "#3ee")
              .attr("width", width)
              .attr("height", plot_outer_height)
            .append("g")
              .attr("transform", `translate(${margin.left}, ${margin.top})`);

let x = d3.scaleBand()
          .range([0, plot_width])
          .padding(0.1);

let y = d3.scaleLinear()
          .range([plot_height, 0]);

let xAxis = plots.append("g")
    .attr('transform', `translate(0,${plot_height})`);

let yAxis = plots.append("g");


function computeStats() {

    try {
        let dxmin = b2.xmin() - b1.xmax();
        let dxmax = b2.xmax() - b1.xmin();
        let dxmean = 0.5 * (dxmin + dxmax);

        let dymin = b2.ymin() - b1.ymax();
        let dymax = b2.ymax() - b1.ymin();
        let dymean = 0.5 * (dymin + dymax);

        let data = [
            {'name': 'dxmin', 'value': dxmin},
            {'name': 'dxmean', 'value': dxmean},
            {'name': 'dxmax', 'value': dxmax},
            {'name': 'dymin', 'value': dymin},
            {'name': 'dymean', 'value': dymean},
            {'name': 'dymax', 'value': dymax}
        ]

        x.domain(data.map(d => d.name));
        xAxis.call(d3.axisBottom(x));

        y.domain([d3.min(data, d => d.value), d3.max(data, d => d.value)]);
        yAxis.transition().call(d3.axisLeft(y));

        plots.selectAll("rect")
            .data(data)
            .join("rect")
            .attr("x", d => x(d.name))
            .attr("y", d => y(d.value))
            .attr("width", d => x.bandwidth())
            .attr("height", d => plot_height - y(d.value))
            .attr("fill", "steelblue");

    }
    catch (error) {
        console.log(error);
    }

};

function makeDraggableBox(box) {

    const handle_size = 10;
    const handle_color = 'rgba(100, 100, 100, 50%)';

    let group = svg.append('g');

    let offset = {x: 0, y: 0};
    
    box.xmin = function() {
        return Math.min(...box.x);
    }

    box.xmax = function() {
        return Math.max(...box.x);
    }

    box.ymin = function() {
        return Math.min(...box.y);
    }

    box.ymax = function() {
        return Math.max(...box.y);
    }

    function boxDragStarted(event) {
        offset = {
            x: box.x[0] - event.x,
            y: box.y[0] - event.y
        };
        group.raise();
    }
        
    function boxDragged(event) {
        let dx = box.x[1] - box.x[0];
        let dy = box.y[1] - box.y[0];
        box.x = [event.x + offset.x, event.x + offset.x + dx];
        box.y = [event.y + offset.y, event.y + offset.y + dy];
        updatePosition();
    }
        
    let boxDrag = d3.drag()
        .on("start", boxDragStarted)
        .on("drag", boxDragged);

    function htlDrag(event) {
        box.x[0] = event.x;
        box.y[0] = event.y;
        updatePosition();
    }

    function htrDrag(event) {
        box.x[1] = event.x;
        box.y[0] = event.y;
        updatePosition();
    }

    function hblDrag(event) {
        box.x[0] = event.x;
        box.y[1] = event.y;
        updatePosition();
    }

    function hbrDrag(event) {
        box.x[1] = event.x;
        box.y[1] = event.y;
        updatePosition();
    }

    function mouseOver(event) {
        ctrl.transition()
            .attr('opacity', 1);
    }

    function mouseOut(event) {
        ctrl.transition()
            .attr('opacity', 0);
    }

    group.on('mouseover', mouseOver)
         .on('mouseout', mouseOut);

    let rect = group.append('rect')
        .attr('fill', box.color)
        .attr('stroke', 'rgba(0, 0, 0, 50%)')
        .call(boxDrag);
    
    let ctrl = group.append('g')
        .attr('opacity', 0);
    controls.push(ctrl);    // Add to the list of controls so we can clear if needed

    let htl = ctrl.append('circle')
        .attr('r', handle_size)
        .attr('fill', handle_color)
        .call(d3.drag().on('drag', htlDrag));
    
    let htr = ctrl.append('circle')
        .attr('r', handle_size)
        .attr('fill', handle_color)
        .call(d3.drag().on('drag', htrDrag));
    
    let hbl = ctrl.append('circle')
        .attr('r', handle_size)
        .attr('fill', handle_color)
        .call(d3.drag().on('drag', hblDrag));
    
    let hbr = ctrl.append('circle')
        .attr('r', handle_size)
        .attr('fill', handle_color)
        .call(d3.drag().on('drag', hbrDrag));

    function updatePosition() {
        group.raise();
        let x0 = box.xmin();
        let x1 = box.xmax();
        let y0 = box.ymin();
        let y1 = box.ymax();
        rect.attr('x', x0)
            .attr('y', y0)
            .attr('width', x1 - x0)
            .attr('height', y1 - y0);
        htl.attr('cx', box.x[0])
           .attr('cy', box.y[0]);
        htr.attr('cx', box.x[1])
           .attr('cy', box.y[0]);
        hbl.attr('cx', box.x[0])
           .attr('cy', box.y[1]);
        hbr.attr('cx', box.x[1])
           .attr('cy', box.y[1]);
        
        // console.log(`${b1.x} ${b1.y}`);

        computeStats();
    }

    updatePosition();
}


makeDraggableBox(b1);
makeDraggableBox(b2);


