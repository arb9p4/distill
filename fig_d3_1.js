let figName = 'fig-d3-1';


let width = document.getElementById(figName).clientWidth;
let height = 300;
let box_size = 30;
let margin = {
    top: 20, right: 30, bottom: 30, left: 40
};







// function dragstarted(event, d) {
//     // d3.select(this).raise().attr("stroke", "black");
// }

// function dragged(event, d) {
//     // d3.select(this).attr("x", d.x = event.x).attr("y", d.y = event.y);
//     // console.log(`${d.i} ${event.x} ${event.y}`);
//     // console.log(this);
//     // b1d.attr("x", event.x);
//     // b1d.attr("y", event.y);
//     // console.log(`${event.x} ${event.y}`);
//     // d.x[0] = event.x;
//     d3.select(this).attr("x", d.x[0] = event.x);
//     console.log(d.x[0]);

// }

// function dragended(event, d) {
//     // d3.select(this).attr("stroke", null);
// }

// let drag = d3.drag()
//     .on("start", dragstarted)
//     .on("drag", dragged)
//     .on("end", dragended);


let svg = d3.select(`div#${figName}`).append('svg');

svg.style("background-color", "#eee");
svg.style("width", width);
svg.style("height", height);

// let x = d3.scaleLinear()
//     .domain([-10, 10])
//     .range([margin.left, width - margin.right]);

// let y = d3.scaleLinear()
//     .domain([-10, 10])
//     .range([height - margin.bottom, margin.top]);


// let h1 = svg.append("circle")
//     .attr("cx", 100)
//     .attr("cy", 100)
//     .attr("r", 30)
//     .attr("fill", "rgb(200, 0, 0)");

// let h2 = svg.append("circle")
//     .attr("cx", 200)
//     .attr("cy", 100)
//     .attr("r", 30)
//     .attr("fill", "rgb(0, 200, 0)")

// var position = [100, 50];  // internal variable
// var p2 = [200, 50];  // internal variable

// function on_drag(event) {
//     // set internal variable based on mouse position
//     // console.log(d);
//     position = [event.x, event.y];
//     redraw();
// }
// function redraw() {
//     // set circle's position based on internal variable
//     h1.attr("cx", position[0])
//         .attr("cy", position[1]);
// }
// h1.call(d3.drag().on('drag', on_drag));
    


// function makeDraggableCircle(point) {
//     let circle = svg.append('circle')
//         .attr('class', "draggable")
//         .attr('r', 10)
//         .attr('fill', "hsl(0,50%,50%)")
//         .call(d3.drag().on('drag', onDrag));

//     function updatePosition() {
//         circle.attr('cx', point.x)
//               .attr('cy', point.y);
                 
//     }
    
//     function onDrag(event) {
//         point.x = event.x;
//         point.y = event.y;
//         updatePosition();
//     }

//     updatePosition();
// }

// let A = {x: 200, y: 200}, B = {x: 300, y: 100};

// makeDraggableCircle(A);
// makeDraggableCircle(B);



function makeDraggableBox(box) {

    const handle_size = 10;
    const handle_color = 'rgba(100, 100, 100, 50%)';

    let active = false;

    let group = svg.append('g');
    let ctrl = group.append('g')
        .attr('opacity', 0);

    let offset = {x: 0, y: 0};
    
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
        // console.log(event);
        active = true;
        ctrl.transition()
            .attr('opacity', 1);
    }

    function mouseOut(event) {
        active = false;
        ctrl.transition()
            .attr('opacity', 0);
    }

    group.on('mouseover', mouseOver)
    .on('mouseout', mouseOut);

    let rect = group.append('rect')
        .attr('fill', box.color)
        .attr('stroke', 'rgba(0, 0, 0, 50%)')
        .call(boxDrag);

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
        let x0 = Math.min(...box.x);
        let x1 = Math.max(...box.x);
        let y0 = Math.min(...box.y);
        let y1 = Math.max(...box.y);
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
    }

    updatePosition();
}





// let g1 = svg.append('g');
// let b1 = {
//     x: Math.random() * (width - box_size * 2) + box_size,
//     y: Math.random() * (height - box_size * 2) + box_size,
//     width: Math.random() * box_size + box_size,
//     height: Math.random() * box_size + box_size
// };

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

makeDraggableBox(b1);
makeDraggableBox(b2);

// g1.selectAll("rect")
//     .data(b1)
//     .join("rect")
//     .attr("x", d => d.x[0])
//     .attr("y", d => d.y[0])
//     .attr("width", d => d.x[1] - d.x[0])
//     .attr("height", d => d.y[1] - d.y[0])
//     .attr("fill", (d, i) => d3.schemeCategory10[i % 10])
//     .call(drag);

// let b1d = g1.append("rect")
//     .attr("x", b1.x)
//     .attr("y", b1.y)
//     .attr("width", b1.width)
//     .attr("height", b1.height)
//     .attr("fill", d3.schemeCategory10[0]);

// g1.append("circle")
//     .attr("cx", b1.x)
//     .attr("cy", b1.y)
//     .attr("r", 5)
//     .call(drag);

const boxes = d3.range(5).map(i => ({
    x: Math.random() * (width - box_size * 2) + box_size,
    y: Math.random() * (height - box_size * 2) + box_size,
    i: i
  }));





// svg.selectAll("rect")
//   .data(boxes)
//   .join("rect")
//     .attr("x", d => d.x)
//     .attr("y", d => d.y)
//     .attr("width", box_size)
//     .attr("height", box_size)
//     .attr("fill", (d, i) => d3.schemeCategory10[i % 10])
//     .call(drag);


