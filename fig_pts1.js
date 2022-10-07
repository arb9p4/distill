d3.csv('pts1.csv')
  .then(function(rows) {

    function unpack(rows, key) {
      return rows.map( function(row) { return row[key]; } );
    }

    var trace1 = {
      x:unpack(rows, 'x1'), y: unpack(rows, 'y1'), z: unpack(rows, 'z1'),
      mode: 'markers',
      marker: {
        color: 'rgb(255, 0, 0)',
        size: 2,
      },
      type: 'scatter3d'
    };

    var trace2 = {
      x:unpack(rows, 'x2'), y: unpack(rows, 'y2'), z: unpack(rows, 'z2'),
      mode: 'markers',
      marker: {
        color: 'rgb(0, 0, 255)',
        size: 2,
      },
      type: 'scatter3d'
    };

    var data = [trace1, trace2];
    let layout = {
      margin: {
        b: 0,
        l: 0,
        r: 0,
        t: 0
      },
      paper_bgcolor: '#f4f4f4',
      hovermode: false,
      scene: {
        aspectmode: 'manual',
        aspectratio: {
          x: 1, y: 1, z: 1,
        },
        camera: {
          projection: {
            type: "orthographic"
          },
          eye: {
            x: 1.25,
            y: -1.25,
            z: 1.25
          }
        },
        xaxis: {
          range: [-920, -923],
          showspikes: false,
          tick0: 0,
          dtick: 0.5
        },
        yaxis: {
          range: [-1013, -1016],
          showspikes: false,
          tick0: 0,
          dtick: 0.5
        },
        zaxis: {
          range: [21, 24],
          showspikes: false,
          tick0: 0,
          dtick: 0.5
        }
      }
    };

    Plotly.newPlot('fig-pts1', data, layout);
  });