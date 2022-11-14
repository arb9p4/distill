import { make_figure } from "./fig_boxes.js";

let config = {
    'b1': {
        x: [0.4, 0.49],
        y: [0.4, 0.6],
        color: '#3399ff'
    },
    'b2': {
        x: [0.51, 0.6],
        y: [0.2, 0.8],
        color: '#ff3333'
    },
    'showTFN': false,
    'showPair2': false,
    'showTFNRPD': false,
    'showHoF': true,
    'showMeasures': false,
    'showCentroids': false
}

make_figure('fig-boxes-hof', config);