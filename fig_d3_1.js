let figName = 'fig-d3-1';


let width = document.getElementById(figName).clientWidth;
let height = 300;
let box_size = 30;
let margin = {
    top: 20, right: 30, bottom: 30, left: 40
};

let fig_container = d3.select(`div#${figName}`).append('div')
    .style('width', width + 'px');
figName += ' div';

// let b1 = {
//     x: [50, 180],
//     y: [40, 170],
//     color: '#3399ff'
// };

// let b2 = {
//     x: [150, 300],
//     y: [140, 270],
//     color: '#ff3333'
// };

// let b3 = {
//     x: [320, 380],
//     y: [40, 120],
//     color: '#99ccff'
// };

// let b4 = {
//     x: [330, 430],
//     y: [130, 190],
//     color: '#ff9999'
// };

let b1 = {
    x: [0.1*width, 0.4*width],
    y: [0.1*height, 0.5*height],
    color: '#3399ff'
};

let b2 = {
    x: [0.3*width, 0.5*width],
    y: [0.4*height, 0.8*height],
    color: '#ff3333'
};

let b3 = {
    x: [0.7*width, 0.9*width],
    y: [0.2*height, 0.4*height],
    color: '#99ccff'
};

let b4 = {
    x: [0.8*width, 0.9*width],
    y: [0.5*height, 0.7*height],
    color: '#ff9999'
};


let svg = d3.select(`div#${figName}`).append('svg');

svg.style("background-color", "#eee");
svg.style("width", width);
svg.style("height", height);
svg.style("margin-bottom", '10px')

// Clear the control handles when clicking on the background (mainly for mobile)
let controls = [];
function clearCtrl(event) {
    controls.map(ctrl => ctrl.transition().attr('opacity', 0));
}
svg.on('click', clearCtrl);






let half_width = (width / 2) - 1;

let mf_plot_outer_height = 130;
let mf_plot_margins = {
    top: 10, right: 30, bottom: 50, left: 40
};
let mf_plot_width = half_width - mf_plot_margins.left - mf_plot_margins.right;
let mf_plot_height = mf_plot_outer_height - mf_plot_margins.top - mf_plot_margins.bottom;
let mf_margin_bottom = 10;

let box_plot_margins = {
    top: 20, right: 20, bottom: 20, left: 20
};
let box_plot_width = half_width - box_plot_margins.left - box_plot_margins.right;
let box_plot_height = 2*mf_plot_outer_height + mf_margin_bottom - box_plot_margins.top - box_plot_margins.bottom;


let box_plots = d3.select(`div#${figName}`).append('svg')
        .attr("width", half_width)
        .attr("height", 2*mf_plot_outer_height + mf_margin_bottom)
        .style("margin-bottom", mf_margin_bottom+'px')
        .style("float", "right")
    .append("g")
        .attr("transform", `translate(${box_plot_margins.left}, ${box_plot_margins.top})`);

let box_x = d3.scaleLinear()
    .range([0, box_plot_width])
    .domain([-100, 100]);

let box_y = d3.scaleLinear()
    .range([0, box_plot_height])
    .domain([100, -100]);

let box_axis_x = box_plots.append("g")
    .attr("transform", `translate(0, ${box_y(0)})`)
    .call(d3.axisBottom(box_x).ticks(5).tickFormat(d => d == 0 ? '' : d));

let box_axis_y = box_plots.append("g")
    .attr("transform", `translate(${box_x(0)}, 0)`)
    .call(d3.axisLeft(box_y).ticks(5).tickFormat(d => d == 0 ? '' : d));


let mf_plots_x = d3.select(`div#${figName}`).append('svg')
              .attr("width", half_width)
              .attr("height", mf_plot_outer_height)
              .style("margin-bottom", mf_margin_bottom+'px')
            .append("g")
              .attr("transform", `translate(${mf_plot_margins.left}, ${mf_plot_margins.top})`);

let mf_x_x = d3.scaleLinear()
          .range([0, mf_plot_width]);

let mf_y_x = d3.scaleLinear()
          .range([mf_plot_height, 0]);

let mf_xAxis_x = mf_plots_x.append("g")
    .attr('transform', `translate(0,${mf_plot_height})`);

let mf_yAxis_x = mf_plots_x.append("g");

let mf_plots_x_box = mf_plots_x.append("g");
let mf_plots_x_mf = mf_plots_x.append("g");

let mf_xAxis_title_x = mf_plots_x.append("text")
   .attr("transform", "translate(" + (mf_plot_width/2) + " ," + (mf_plot_height+40) + ")")
   .style("text-anchor", "middle")
   .text("X");


let mf_plots_y = d3.select(`div#${figName}`).append('svg')
              .attr("width", half_width)
              .attr("height", mf_plot_outer_height)
              .style("margin-bottom", mf_margin_bottom+'px')
            .append("g")
              .attr("transform", `translate(${mf_plot_margins.left}, ${mf_plot_margins.top})`);

let mf_x_y = d3.scaleLinear()
          .range([0, mf_plot_width]);

let mf_y_y = d3.scaleLinear()
          .range([mf_plot_height, 0]);

let mf_xAxis_y = mf_plots_y.append("g")
    .attr('transform', `translate(0,${mf_plot_height})`);

let mf_yAxis_y = mf_plots_y.append("g");

let mf_plots_y_box = mf_plots_y.append("g");
let mf_plots_y_mf = mf_plots_y.append("g");

let mf_xAxis_title_y = mf_plots_y.append("text")
   .attr("transform", "translate(" + (mf_plot_width/2) + " ," + (mf_plot_height+40) + ")")
   .style("text-anchor", "middle")
   .text("Y");


let hof_plots_0_svg = d3.select(`div#${figName}`).append('svg')
   .attr("width", half_width)
   .attr("height", mf_plot_outer_height)
   .style("margin-bottom", mf_margin_bottom+'px');
let hof_plots_0 = hof_plots_0_svg.append("g")
   .attr("transform", `translate(${mf_plot_margins.left}, ${mf_plot_margins.top})`);

let hof_x_0 = d3.scaleLinear()
.range([0, mf_plot_width]);

let hof_y_0 = d3.scaleLinear()
.range([mf_plot_height, 0]);

let hof_xAxis_0 = hof_plots_0.append("g")
.attr('transform', `translate(0,${mf_plot_height})`);

let hof_yAxis_0 = hof_plots_0.append("g");

let hof_title_0 = hof_plots_0.append("text")
   .attr("transform", "translate(" + (mf_plot_width/2) + " ," + (mf_plot_height+40) + ")")
   .style("text-anchor", "middle")
   .text("Constant Forces (F0)");


let hof_plots_2_svg = d3.select(`div#${figName}`).append('svg')
   .attr("width", half_width)
   .attr("height", mf_plot_outer_height)
   .style("margin-bottom", mf_margin_bottom+'px');
let hof_plots_2 = hof_plots_2_svg.append("g")
   .attr("transform", `translate(${mf_plot_margins.left}, ${mf_plot_margins.top})`);

let hof_x_2 = d3.scaleLinear()
.range([0, mf_plot_width]);

let hof_y_2 = d3.scaleLinear()
.range([mf_plot_height, 0]);

let hof_xAxis_2 = hof_plots_2.append("g")
.attr('transform', `translate(0,${mf_plot_height})`);

let hof_yAxis_2 = hof_plots_2.append("g");

let hof_title_2 = hof_plots_2.append("text")
   .attr("transform", "translate(" + (mf_plot_width/2) + " ," + (mf_plot_height+40) + ")")
   .style("text-anchor", "middle")
   .text("Hybrid Forces (F02)");


let plot_outer_height = 200;
let plot_margins = {
    top: 10, right: 30, bottom: 90, left: 40
};
let plot_width = width - plot_margins.left - plot_margins.right;
let plot_height = plot_outer_height - plot_margins.top - plot_margins.bottom;

let plots = d3.select(`div#${figName}`).append('svg')
              .attr("width", width)
              .attr("height", plot_outer_height)
              .style("margin-bottom", mf_margin_bottom+'px')
            .append("g")
              .attr("transform", `translate(${plot_margins.left}, ${plot_margins.top})`);

let x = d3.scaleBand()
          .range([0, plot_width])
          .padding(0.1);

let y = d3.scaleLinear()
          .range([plot_height, 0]);

let xAxis = plots.append("g")
    .attr('transform', `translate(0,${plot_height})`);

let yAxis = plots.append("g");

let maxLine = plots.append("line")
    .attr('x1', 0)
    .attr('x2', plot_width)
    .attr('y1', 0)
    .attr('y2', 0)
    .attr('stroke', 'black')
    .attr('stroke-dasharray', "4")

let plot_title = plots.append("text")
    .attr("transform", "translate(" + (plot_width/2) + " ," + (plot_height+80) + ")")
    .style("text-anchor", "middle")
    .text("Similarity Measures");


let canvas_resolution = 0.075;
let canvas = document.createElement('canvas');
canvas.style.backgroundColor = "#000";
canvas.setAttribute("width", width*canvas_resolution);
canvas.setAttribute("height", height*canvas_resolution);
let context = canvas.getContext("2d", {'willReadFrequently': true});
// document.getElementById(figName).appendChild(canvas);


function getTFdiff(box1, box2) {
    let dxmin = box2.xmin() - box1.xmax();
    let dxmax = box2.xmax() - box1.xmin();
    // let dxmean = 0.5 * (dxmin + dxmax);
    let dxmean = box2.centroid[0] - box1.centroid[0];

    let dymin = box2.ymin() - box1.ymax();
    let dymax = box2.ymax() - box1.ymin();
    // let dymean = 0.5 * (dymin + dymax);
    let dymean = box2.centroid[1] - box1.centroid[1];

    return {'x': [dxmin, dxmean, dxmax],
            'y': [dymin, dymean, dymax]};
}

let numberDirections = 32;
let angleIncrement = 360/numberDirections;
function hof(box2, box1) {
    let ctx_width = context.canvas.width;
    let ctx_height = context.canvas.height;
    let x0, y0, x1, y1;
    let img;

    context.clearRect(0, 0, ctx_width, ctx_height);
    context.fillStyle = "#fff";
    x0 = box1.xmin() * canvas_resolution;
    y0 = box1.ymin() * canvas_resolution;
    x1 = box1.xmax() * canvas_resolution;
    y1 = box1.ymax() * canvas_resolution;
    context.fillRect(x0, y0, x1-x0, y1-y0);
    img = context.getImageData(0, 0, ctx_width, ctx_height).data;
    
    let imgA = new Array(ctx_width*ctx_height);
    for (let i = 0; i < ctx_width*ctx_height; i++) {
        imgA[i] = img[i*4];
    }

    context.clearRect(0, 0, ctx_width, ctx_height);
    context.fillStyle = "#fff";
    x0 = box2.xmin() * canvas_resolution;
    y0 = box2.ymin() * canvas_resolution;
    x1 = box2.xmax() * canvas_resolution;
    y1 = box2.ymax() * canvas_resolution;
    context.fillRect(x0, y0, x1-x0, y1-y0);
    img = context.getImageData(0, 0, ctx_width, ctx_height).data;
    
    let imgB = new Array(ctx_width*ctx_height);
    for (let i = 0; i < ctx_width*ctx_height; i++) {
        imgB[i] = img[i*4];
    }
    
    let f0, f02;
    if (use_vec_hof) {
        f0 = FHistogram_CrispVector(numberDirections, 0.0, box1.xmin(), box1.xmax(), box1.ymin(), box1.ymax(), box2.xmin(), box2.xmax(), box2.ymin(), box2.ymax())
        f02 = FHistogram_CrispVector(numberDirections, 2.0, box1.xmin(), box1.xmax(), box1.ymin(), box1.ymax(), box2.xmin(), box2.xmax(), box2.ymin(), box2.ymax())

        f02 = f02.map(x => Math.max(0, x))
    } else {
        f0 = FHist(numberDirections, false, 0.0, imgA, imgB, ctx_width, ctx_height);
        f02 = FHist(numberDirections, true, 0.0, imgA, imgB, ctx_width, ctx_height);

        // Rotate the histograms
        f0.reverse();
        f02.reverse();
    }

    let n = 3 * numberDirections / 4;
    f0 = f0.slice(n, -1).concat(f0.slice(0, n)).concat(f0[n])
    f02 = f02.slice(n, -1).concat(f02.slice(0, n)).concat(f02[n])

    // console.log(f0);

    return {'f0': f0, 'f02': f02}
}


let use_hof = true;
let use_vec_hof = false;

function setVectorHoF(event) {
    console.log('set vector');
    hof_plots_0_svg.style("display", "inline");
    hof_plots_2_svg.style("display", "inline");
    use_hof = true;
    use_vec_hof = true;
    numberDirections = 128;
    angleIncrement = 360/numberDirections;
    hof_title_2.text("Gravitational Forces (F2)");
    computeStats();
}

function setHighRes(event) {
    console.log('set high res');
    hof_plots_0_svg.style("display", "inline");
    hof_plots_2_svg.style("display", "inline");
    use_hof = true;
    use_vec_hof = false;
    numberDirections = 128;
    angleIncrement = 360/numberDirections;
    canvas_resolution = 0.5;
    canvas.setAttribute("width", width*canvas_resolution);
    canvas.setAttribute("height", height*canvas_resolution);
    context = canvas.getContext("2d", {'willReadFrequently': true});
    hof_title_2.text("Hybrid Forces (F02)");
    computeStats();
}

function setLowRes(event) {
    console.log('set low res');
    hof_plots_0_svg.style("display", "inline");
    hof_plots_2_svg.style("display", "inline");
    use_hof = true;
    use_vec_hof = false;
    numberDirections = 32;
    angleIncrement = 360/numberDirections;
    canvas_resolution = 0.08;
    canvas.setAttribute("width", width*canvas_resolution);
    canvas.setAttribute("height", height*canvas_resolution);
    context = canvas.getContext("2d", {'willReadFrequently': true});
    hof_title_2.text("Hybrid Forces (F02)");
    computeStats();
}

function setNoHoF(event) {
    use_hof = false;
    hof_plots_0_svg.style("display", "none");
    hof_plots_2_svg.style("display", "none");
    computeStats();
}

let btn_no_hof = d3.select(`div#${figName}`).append('button')
    .text('No HoF')
    .style('margin', '5px')
    .on('click', setNoHoF);
let btn_low_hof = d3.select(`div#${figName}`).append('button')
    .text('Low Fidelity HoF')
    .style('margin', '5px')
    .on('click', setLowRes);
let btn_high_hof = d3.select(`div#${figName}`).append('button')
    .text('High Fidelity HoF')
    .style('margin', '5px')
    .on('click', setHighRes);
let btn_vec_hof = d3.select(`div#${figName}`).append('button')
    .text('Vector HoF')
    .style('margin', '5px')
    .on('click', setVectorHoF);


function computeHoFSim(hof1, hof2) {

    let N = hof1.f0.length;

    let f0_min = 0;
    let f0_max = 0;
    let f0_abs_sum = 0;
    let f0_abs_diff = 0;
    let f0_h1_h2 = 0;
    let f0_h1_h1 = 0;
    let f0_h2_h2 = 0;
    for (let i = 0; i < N; i++) {
        f0_min += Math.min(hof1.f0[i], hof2.f0[i]);
        f0_max += Math.max(hof1.f0[i], hof2.f0[i]);
        f0_abs_sum += Math.abs(hof1.f0[i] + hof2.f0[i]);
        f0_abs_diff += Math.abs(hof1.f0[i] - hof2.f0[i]);
        f0_h1_h2 += hof1.f0[i] * hof2.f0[i];
        f0_h1_h1 += hof1.f0[i] * hof1.f0[i];
        f0_h2_h2 += hof2.f0[i] * hof2.f0[i];
    }
    let f0_t = f0_min / f0_max;
    let f0_p = 1 - f0_abs_diff / f0_abs_sum;
    let f0_cc = f0_h1_h2 / (Math.sqrt(f0_h1_h1) * Math.sqrt(f0_h2_h2));

    let f02_min = 0;
    let f02_max = 0;
    let f02_abs_sum = 0;
    let f02_abs_diff = 0;
    let f02_h1_h2 = 0;
    let f02_h1_h1 = 0;
    let f02_h2_h2 = 0;
    for (let i = 0; i < N; i++) {
        f02_min += Math.min(hof1.f02[i], hof2.f02[i]);
        f02_max += Math.max(hof1.f02[i], hof2.f02[i]);
        f02_abs_sum += Math.abs(hof1.f02[i] + hof2.f02[i]);
        f02_abs_diff += Math.abs(hof1.f02[i] - hof2.f02[i]);
        f02_h1_h2 += hof1.f02[i] * hof2.f02[i];
        f02_h1_h1 += hof1.f02[i] * hof1.f02[i];
        f02_h2_h2 += hof2.f02[i] * hof2.f02[i];
    }
    let eps = 0.000001;
    let f02_t = f02_min / (f02_max + eps);
    let f02_p = 1 - f02_abs_diff / (f02_abs_sum + eps);
    let f02_cc = f02_h1_h2 / (Math.sqrt(f02_h1_h1) * Math.sqrt(f02_h2_h2) + eps);

    let f02_h1_is_zero = hof1.f02.map(x => x).reduce((acc, cur) => (cur==0) && acc, true);
    let f02_h2_is_zero = hof2.f02.map(x => x).reduce((acc, cur) => (cur==0) && acc, true);

    let t, p, cc;
    if (f02_h1_is_zero || f02_h2_is_zero) {
        t = 0.5 * f0_t;
        p = 0.5 * f0_p;
        cc = 0.5 * f0_cc;
    } else {
        t = 0.5 * f0_t + 0.5 * f02_t;
        p = 0.5 * f0_p + 0.5 * f02_p;
        cc = 0.5 * f0_cc + 0.5 * f02_cc;
    }

    return {
        't': t,
        'p': p,
        'cc': cc
    };
}

function isect(x0, x1, y0, y1) {
    // From https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
    let denom = (x0-x1) - (y0-y1);
    let eps = 1e-9;
    if (Math.abs(denom) < eps) {
        if (Math.abs(x0-x1) < eps && Math.abs(y0-y1) < eps && Math.abs(y0-x1) < eps) {
            return [x0, 1];
        }
        else {
            return [null, null];
        }
    }
    let t = (x0-y0)/denom;
    let u = (y0-x0)/denom;
    let px = x0 + t*(x1-x0);
    let py = 1-t
    if (py < 0 || py > 1) {
        px = null;
        py = null;
    }
    return [px, py];
}

function tri_intersect_area(A, B) {
    A.sort(function(a, b){return a - b});
    B.sort(function(a, b){return a - b});
    
    let pts = [];
    pts.push(isect(A[1], A[0], B[1], B[0]));
    pts.push(isect(A[1], A[0], B[1], B[2]));
    pts.push(isect(A[1], A[2], B[1], B[0]));
    pts.push(isect(A[1], A[2], B[1], B[2]));

    pts = pts.filter(x => x[0] != null || x[1] != null);
    pts.sort(function(a, b){
        if (a[0] < b[0]) {return -1}
        if (a[0] > b[0]) {return 1}
        if (a[1] < b[1]) {return -1}
        if (a[1] > b[1]) {return 1}
        return 0;
    });

    let ip = [[Math.max(A[0], B[0]), 0]];
    for (let i = 0; i < pts.length; i++) {
        ip.push(pts[i]);
    }
    ip.push([Math.min(A[2], B[2]), 0]);
    
    let area = 0;
    for (let i = 1; i < ip.length; i++) {
        let x0 = ip[i-1][0];
        let y0 = ip[i-1][1];
        let x1 = ip[i][0];
        let y1 = ip[i][1];
        area += (x1 - x0) * (0.5*Math.abs(y1 - y0) + Math.min(y0, y1));
    }
    return area;
}

function tnorm_max(A, B) {
    let pts = [];
    pts.push(isect(A[1], A[0], B[1], B[0]));
    pts.push(isect(A[1], A[0], B[1], B[2]));
    pts.push(isect(A[1], A[2], B[1], B[0]));
    pts.push(isect(A[1], A[2], B[1], B[2]));

    let tnorm = 0;
    for (let i = 0; i < pts.length; i++) {
        if (pts[i][1] != null) {
            tnorm = Math.max(tnorm, pts[i][1]);
        }
    }

    return tnorm;
}

function tnorm_iou(A, B) {
    let areaA = 0.5 * (A[2] - A[0]);
    let areaB = 0.5 * (B[2] - B[0]);
    let iarea = tri_intersect_area(A, B);
    let uarea = areaA + areaB - iarea;

    let iou = 0;
    if (uarea > 0) {
        iou = iarea / uarea;
    }

    return iou;
}

function computeStats() {

    try {

        let d1 = getTFdiff(b1, b2);
        let d2 = getTFdiff(b3, b4);

        // console.log(`${d1.x} ${d1.y}`);
        // console.log(`${d2.x} ${d2.y}`);

        

        d1.color = '#5cd65c';
        d2.color = '#adebad';
        let mf_data = [d1, d2];
        let box_data = [b1, b2, b3, b4];

        let mf_data_min_x = mf_data.map(d => d.x[0]).reduce((acc, cur) => Math.min(acc, cur), Infinity);
        let mf_data_max_x = mf_data.map(d => d.x[2]).reduce((acc, cur) => Math.max(acc, cur), -Infinity);
        let mf_data_min_y = mf_data.map(d => d.y[0]).reduce((acc, cur) => Math.min(acc, cur), Infinity);
        let mf_data_max_y = mf_data.map(d => d.y[2]).reduce((acc, cur) => Math.max(acc, cur), -Infinity);
        // console.log(mf_data_min, mf_data_max);

        let x_buff = 10;
        
        // mf_x_x.domain([mf_data_min_x-x_buff, mf_data_max_x+x_buff]);
        mf_x_x.domain([-width-x_buff, width+x_buff]);
        mf_xAxis_x.call(d3.axisBottom(mf_x_x).ticks(4));

        mf_y_x.domain([0, 1]);
        mf_yAxis_x.call(d3.axisLeft(mf_y_x).ticks(3));

        mf_plots_x_box.selectAll("polygon")
            .data(box_data)
            .join("polygon")
            .attr("points", d => `${mf_x_x(d.x[0])},${mf_y_x(0)} ${mf_x_x(d.centroid[0])},${mf_y_x(1)} ${mf_x_x(d.x[1])},${mf_y_x(0)}`)
            .attr("stroke", "black")
            .attr("fill", d => d.color)
            .attr("opacity", 0.8);

        mf_plots_x_mf.selectAll("polygon")
            .data(mf_data)
            .join("polygon")
            .attr("points", d => `${mf_x_x(d.x[0])},${mf_y_x(0)} ${mf_x_x(d.x[1])},${mf_y_x(1)} ${mf_x_x(d.x[2])},${mf_y_x(0)}`)
            .attr("stroke", "black")
            .attr("fill", d => d.color)
            .attr("opacity", 0.8);
        
        // mf_x_y.domain([mf_data_min_y-x_buff, mf_data_max_y+x_buff]);
        mf_x_y.domain([-height-x_buff, height+x_buff]);
        mf_xAxis_y.call(d3.axisBottom(mf_x_y).ticks(4));

        mf_y_y.domain([0, 1]);
        mf_yAxis_y.call(d3.axisLeft(mf_y_y).ticks(3));

        mf_plots_y_box.selectAll("polygon")
            .data(box_data)
            .join("polygon")
            .attr("points", d => `${mf_x_y(height-d.y[0])},${mf_y_y(0)} ${mf_x_y(height-d.centroid[1])},${mf_y_y(1)} ${mf_x_y(height-d.y[1])},${mf_y_y(0)}`)
            .attr("stroke", "black")
            .attr("fill", d => d.color)
            .attr("opacity", 0.8);

        mf_plots_y_mf.selectAll("polygon")
            .data(mf_data)
            .join("polygon")
            .attr("points", d => `${mf_x_y(-d.y[0])},${mf_y_y(0)} ${mf_x_y(-d.y[1])},${mf_y_y(1)} ${mf_x_y(-d.y[2])},${mf_y_y(0)}`)
            .attr("stroke", "black")
            .attr("fill", d => d.color)
            .attr("opacity", 0.8);


        let d_x_min = Math.min(d1.x[0], d2.x[0]);
        let d_x_max = Math.max(d1.x[2], d2.x[2]);
        let d_y_min = Math.min(d1.y[0], d2.y[0]);
        let d_y_max = Math.max(d1.y[2], d2.y[2]);
        let d_x_abs = Math.max(Math.abs(d_x_min), Math.abs(d_x_max));
        let d_y_abs = Math.max(Math.abs(d_y_min), Math.abs(d_y_max));

        let d_x_abs_ar = Math.max(d_x_abs, d_y_abs * box_plot_width / box_plot_height);
        let d_y_abs_ar = d_x_abs_ar * box_plot_height / box_plot_width;

        let box_buff = 30;
        box_x.domain([-d_x_abs_ar-box_buff, d_x_abs_ar+box_buff]);
        box_y.domain([d_y_abs_ar+box_buff, -d_y_abs_ar-box_buff]);

        box_axis_x.call(d3.axisBottom(box_x).ticks(5).tickFormat(d => d == 0 ? '' : d));
        box_axis_y.call(d3.axisLeft(box_y).ticks(5).tickFormat(d => d == 0 ? '' : d));

        box_plots.selectAll('rect')
            .data([d1, d2])
            .join('rect')
            .attr('fill', d => d.color)
            .attr('stroke', 'rgba(0, 0, 0, 50%)')
            .attr('opacity', 0.8)
            .attr('x', d => box_x(d.x[0]))
            .attr('y', d => box_y(-d.y[0]))
            .attr('width', d => box_x(d.x[2]) - box_x(d.x[0]))
            .attr('height', d => box_y(d.y[0]) - box_y(d.y[2]))
        
        box_plots.selectAll('circle')
            .data([d1, d2])
            .join('circle')
            .attr('fill', d => d.color)
            .attr('stroke', 'rgba(0, 0, 0, 25%)')
            .attr('cx', d => box_x(d.x[1]))
            .attr('cy', d => box_y(-d.y[1]))
            .attr('r', 5);


        let hof1, hof2;
        let hof_data_f0, hof_data_f02;
        let hof_data_max_y_0, hof_data_max_y_2;

        if (use_hof) {
            hof1 = hof(b1, b2);
            hof2 = hof(b3, b4);

            hof_data_f0 = [
                {'f': hof1.f0, 'color': "#ff9900"},
                {'f': hof2.f0, 'color': "#ffd699"}
            ];

            hof_data_f02 = [
                {'f': hof1.f02, 'color': "#8000ff"},
                {'f': hof2.f02, 'color': "#cc99ff"}
            ];

            hof_data_max_y_0 = hof_data_f0.map(d => Math.max(...d.f)).reduce((acc, cur) => Math.max(acc, cur), -Infinity);
            hof_data_max_y_2 = hof_data_f02.map(d => Math.max(...d.f)).reduce((acc, cur) => Math.max(acc, cur), -Infinity);
        }
        else {
            hof_data_f0 = [
                {'f': [], 'color': "#ff9900"},
                {'f': [], 'color': "#ffd699"}
            ];
            hof_data_f02 = [
                {'f': [], 'color': "#8000ff"},
                {'f': [], 'color': "#cc99ff"}
            ];
            hof_data_max_y_0 = 1;
            hof_data_max_y_2 = 1;
        }

        
        hof_x_0.domain([0, 360]);
        hof_xAxis_0.call(d3.axisBottom(hof_x_0).tickValues(d3.range(0, 361, 90)));

        hof_y_0.domain([0, hof_data_max_y_0]);
        hof_yAxis_0.call(d3.axisLeft(hof_y_0).ticks(3).tickFormat(d3.format('~s')));

        hof_plots_0.selectAll("polygon")
            .data(hof_data_f0)
            .join("polygon")
            .attr("points", function(d) {
                let s = `${hof_x_0(0)},${hof_y_0(0)} `;
                for (let i = 0; i < d.f.length; i++) {
                    s += `${hof_x_0(i*angleIncrement)},${hof_y_0(d.f[i])} `
                }
                s += `${hof_x_0(360)},${hof_y_0(0)}`
                return s;
            })
            .attr("stroke", "black")
            .attr("fill", d => d.color)
            .attr("opacity", 0.8);

        
        hof_x_2.domain([0, 360]);
        hof_xAxis_2.call(d3.axisBottom(hof_x_2).tickValues(d3.range(0, 361, 90)));

        hof_y_2.domain([0, hof_data_max_y_2]);
        hof_yAxis_2.call(d3.axisLeft(hof_y_2).ticks(3));

        hof_plots_2.selectAll("polygon")
            .data(hof_data_f02)
            .join("polygon")
            .attr("points", function(d) {
                let s = `${hof_x_2(0)},${hof_y_2(0)} `;
                for (let i = 0; i < d.f.length; i++) {
                    s += `${hof_x_2(i*angleIncrement)},${hof_y_2(d.f[i])} `
                }
                s += `${hof_x_2(360)},${hof_y_2(0)}`
                return s;
            })
            .attr("stroke", "black")
            .attr("fill", d => d.color)
            .attr("opacity", 0.8);



        

        // let dmin = [d2.x[0] - d1.x[0], d2.y[0] - d1.y[0]];
        // let smin = 1 / (Math.sqrt(dmin[0]**2 + dmin[1]**2) + 0.0001);

        // let dmean = [d2.x[1] - d1.x[1], d2.y[1] - d1.y[1]];
        // let smean = 1 / (Math.sqrt(dmean[0]**2 + dmean[1]**2) + 0.0001);

        // let dmax = [d2.x[2] - d1.x[2], d2.y[2] - d1.y[2]];
        // let smax = 1 / (Math.sqrt(dmax[0]**2 + dmax[1]**2) + 0.0001);


        let samax_x = tnorm_max(d1.x, d2.x);
        let samax_y = tnorm_max(d1.y, d2.y);
        let samax_min = Math.min(samax_x, samax_y);
        let samax_mean = 0.5 * (samax_x + samax_y);

        let saiou_x = tnorm_iou(d1.x, d2.x);
        let saiou_y = tnorm_iou(d1.y, d2.y);
        let saiou_min = Math.min(saiou_x, saiou_y);
        let saiou_mean = 0.5 * (saiou_x + saiou_y);

        let pdx = 0;
        let pdy = 0;
        for (let i = 0; i < 3; i++) {
            pdx += Math.abs(d1.x[i]-d2.x[i])/(d1.x[2]-d1.x[0]+d2.x[2]-d2.x[0]);
            pdy += Math.abs(d1.y[i]-d2.y[i])/(d1.y[2]-d1.y[0]+d2.y[2]-d2.y[0]);
        }

        let bbpd = 1 / (1 + pdx + pdy);

        pdx = 1/(1+pdx);
        pdy = 1/(1+pdy);

        let pdmin = Math.min(pdx, pdy);
        let pdmean = 0.5 * (pdx + pdy);


        let x_int = [Math.max(d1.x[0], d2.x[0]), Math.min(d1.x[2], d2.x[2])]
        let y_int = [Math.max(d1.y[0], d2.y[0]), Math.min(d1.y[2], d2.y[2])]
        let interArea = Math.max(0, x_int[1] - x_int[0]) * Math.max(0, y_int[1] - y_int[0]);

        let d1_area = (d1.x[2] - d1.x[0]) * (d1.y[2] - d1.y[0]);
        let d2_area = (d2.x[2] - d2.x[0]) * (d2.y[2] - d2.y[0]);

        let bbiou = interArea / (d1_area + d2_area - interArea);

        let x_hull = [Math.min(d1.x[0], d2.x[0]), Math.max(d1.x[2], d2.x[2])];
        let y_hull = [Math.min(d1.y[0], d2.y[0]), Math.max(d1.y[2], d2.y[2])];
        let hullArea = (x_hull[1] - x_hull[0]) * (y_hull[1] - y_hull[0]);

        let bbgiou = bbiou - (hullArea - d1_area - d2_area + interArea) / hullArea;

        let bbmgiou = (bbgiou + 1) / 2;


        // let bbpd = 0;
        // for (let i = 0; i < 3; i++) {
        //     bbpd += Math.abs(d1.x[i] - d2.x[i]) / (d1.x[2]-d1.x[0]+d2.x[2]-d2.x[0]);
        //     bbpd += Math.abs(d1.y[i] - d2.y[i]);
        // }
        // bbpd = 1 / (1 + bbpd);

        let data;
        if (use_hof) {
            let hofSim = computeHoFSim(hof1, hof2);
            data = [
                {'name': 'TFN-SA-Min-Max', 'value': samax_min},
                {'name': 'TFN-SA-Min-IoU', 'value': saiou_min},
                {'name': 'TFN-SA-Min-PD', 'value': pdmin},
                {'name': 'TFN-SA-Mean-Max', 'value': samax_mean},
                {'name': 'TFN-SA-Mean-IoU', 'value': saiou_mean},
                {'name': 'TFN-SA-Mean-PD', 'value': pdmean},
                {'name': 'TFN-BB-IOU', 'value': bbiou},
                {'name': 'TFN-BB-GIOU', 'value': bbmgiou},
                {'name': 'TFN-BB-PD', 'value': bbpd},
                {'name': 'HOF-T', 'value': hofSim.t},
                {'name': 'HOF-P', 'value': hofSim.p},
                {'name': 'HOF-C', 'value': hofSim.cc}
            ];
        }
        else {
            data = [
                {'name': 'TFN-SA-Min-Max', 'value': samax_min},
                {'name': 'TFN-SA-Min-IoU', 'value': saiou_min},
                {'name': 'TFN-SA-Min-PD', 'value': pdmin},
                {'name': 'TFN-SA-Mean-Max', 'value': samax_mean},
                {'name': 'TFN-SA-Mean-IoU', 'value': saiou_mean},
                {'name': 'TFN-SA-Mean-PD', 'value': pdmean},
                {'name': 'TFN-BB-IOU', 'value': bbiou},
                {'name': 'TFN-BB-GIOU', 'value': bbmgiou},
                {'name': 'TFN-BB-PD', 'value': bbpd}
            ];
        }
        x.domain(data.map(d => d.name));
        xAxis.call(d3.axisBottom(x))
            .selectAll("text")
            .attr("y", 15)
            .attr("x", 0)
            .attr("dy", ".35em")
            .attr("transform", "rotate(-30)")
            .style("text-anchor", "end");

        // y.domain([d3.min(data, d => d.value), d3.max(data, d => d.value)]);
        y.domain([0, 1]);
        yAxis.transition().call(d3.axisLeft(y).ticks(5));

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

    box.centroid = [0.5*(box.x[0] + box.x[1]), 0.5*(box.y[0] + box.y[1])];

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

        let canvas_x = Math.min(Math.max(event.x + offset.x, 0), width-dx);
        let canvas_y = Math.min(Math.max(event.y + offset.y, 0), height-dy);

        let dxc = box.centroid[0] - box.x[0];
        let dyc = box.centroid[1] - box.y[0];
        box.x = [canvas_x, canvas_x + dx];
        box.y = [canvas_y, canvas_y + dy];
        box.centroid = [canvas_x + dxc, canvas_y + dyc];
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

    function hcDrag(event) {
        box.centroid[0] = event.x;
        box.centroid[1] = event.y;
        updatePosition();
    }

    function mouseOver(event) {
        ctrl.transition()
            .attr('opacity', 1);
        hc.transition()
            .attr('r', handle_size);
    }

    function mouseOut(event) {
        ctrl.transition()
            .attr('opacity', 0);
        hc.transition()
            .attr('r', 0.5*handle_size);
    }

    group.on('mouseover', mouseOver)
         .on('mouseout', mouseOut);

    let rect = group.append('rect')
        .attr('fill', box.color)
        .attr('stroke', 'rgba(0, 0, 0, 50%)')
        .attr('opacity', 0.8)
        .call(boxDrag);

    let hc = group.append('circle')
        .attr('r', 0.5*handle_size)
        .attr('fill', box.color)
        .attr('stroke', 'rgba(0, 0, 0, 25%)')
        .call(d3.drag().on('drag', hcDrag));
    
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

        // Enforce canvas bounds
        box.x[0] =  Math.min(Math.max(box.x[0], 0), width);
        box.x[1] =  Math.min(Math.max(box.x[1], 0), width);
        box.y[0] =  Math.min(Math.max(box.y[0], 0), height);
        box.y[1] =  Math.min(Math.max(box.y[1], 0), height);

        // Enforce centroid bounds
        box.centroid[0] = Math.max(Math.min(box.centroid[0], box.xmax()), box.xmin());
        box.centroid[1] = Math.max(Math.min(box.centroid[1], box.ymax()), box.ymin());

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
        hc.attr('cx', box.centroid[0])
          .attr('cy', box.centroid[1]);
        
        // console.log(`${b1.x} ${b1.y}`);

        computeStats();
    }

    updatePosition();
}


makeDraggableBox(b1);
makeDraggableBox(b2);
makeDraggableBox(b3);
makeDraggableBox(b4);

function initialize() {
    console.log("try init");
    try {
        if (Module.runtimeInitialized) {
            console.log("initialized");
            computeStats();
            console.log('here');
        } else {
            console.log('retry');
            setTimeout(initialize, 100);
        }
        
    }
    catch (error){
        console.log(error);
        console.log('not init');
        setTimeout(initialize, 100);
    }
}

// initialize();

// Todo: make this more robust (need to wait for HoF module to load)
setTimeout(computeStats, 1000);