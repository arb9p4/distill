//Import the hofcore module
var imported = document.createElement("script");
imported.src = "hofcore.js";
document.getElementsByTagName("head")[0].appendChild(imported);


function F0Hist(context, numberDirections) {
  return FRHist(context, numberDirections, false, 0.0);
}

function F2Hist(context, numberDirections) {
  return FRHist(context, numberDirections, false, 2.0);
}

function F02Hist(context, numberDirections) {
  return FRHist(context, numberDirections, true);
}

function FRHist(context, numberDirections, useHybrid, typeForce = undefined) {
  let width = context.canvas.width;
  let height = context.canvas.height;
  let img = context.getImageData(0, 0, width, height).data;

  let imgA = new Array(width*height);
  for (let i = 0; i < width*height; i++) {
      imgA[i] = img[i*4];
  }

  let imgB = new Array(width*height);
  for (let i = 0; i < width*height; i++) {
      imgB[i] = img[i*4 + 2];
  }

  return FHist(numberDirections, useHybrid, typeForce, imgA, imgB, width, height);
}

function FHist(numberDirections, useHybrid, typeForce, imageA, imageB, width, height) {
  let imgAOnHeap;
  let imgBOnHeap;
  let histOnHeap;
  let hist;
  try {
      imgAOnHeap = Module._malloc(imageA.length);
      Module.HEAP8.set(imageA, imgAOnHeap);

      imgBOnHeap = Module._malloc(imageB.length);
      Module.HEAP8.set(imageB, imgBOnHeap);

      histOnHeap = Module._malloc((numberDirections+1) * 8);

      if (useHybrid) {
        let p0 = 0.01;
        let p1 = 3.0;
        Module._F02Histogram_CrispRaster(histOnHeap, numberDirections, imgAOnHeap, imgBOnHeap, width, height, p0, p1);
      } else {
        Module._FRHistogram_CrispRaster(histOnHeap, numberDirections, typeForce, imgAOnHeap, imgBOnHeap, width, height);
      }

      hist = new Float64Array(Module.HEAPF64.buffer, histOnHeap, numberDirections+1);
      
      return Array.from(hist);
  } finally {
      Module._free(imgAOnHeap);
      Module._free(imgBOnHeap);
      Module._free(histOnHeap);
  }
  
}

function vector_test() {
  Module._vector_test();
}


function FHistogram_CrispVector(numberDirections, typeForce, AX0, AX1, AY0, AY1, BX0, BX1, BY0, BY1) {
  let histOnHeap;
  let hist;
  try {
      histOnHeap = Module._malloc((numberDirections+1) * 8);

      Module._FHistogram_CrispVector(histOnHeap, numberDirections, typeForce, AX0, AX1, AY0, AY1, BX0, BX1, BY0, BY1)

      hist = new Float64Array(Module.HEAPF64.buffer, histOnHeap, numberDirections+1);
      
      return Array.from(hist);
  } finally {
      Module._free(histOnHeap);
  }
}