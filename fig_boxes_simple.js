import { make_figure } from "./fig_boxes.js";

let config = {
    'b1': {
        x: [0.6, 0.7],
        y: [0.15, 0.45],
        color: '#3399ff'
    },
    'b2': {
        x: [0.25, 0.45],
        y: [0.7, 0.9],
        color: '#ff3333'
    },
    'showPair2': false,
    'showTFNRPD': true,
    'showHoF': false,
    'showMeasures': false
}

make_figure('fig-boxes-simple', config);