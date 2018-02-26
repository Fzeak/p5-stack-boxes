console.time('executetime');

var packingGuide = [{
  // "grid":[{"scale":1,"total":56,"initial":56},{"scale":1,"total":33,"initial":33},{"scale":8,"total":64,"initial":8}],"totalSize":153,"quantity":8},{"grid":[{"scale":1,"total":25,"initial":25},{"scale":1,"total":5,"initial":5},{"scale":5,"total":5,"initial":1}],"totalSize":35,"quantity":5},{"grid":[{"scale":1,"total":32,"initial":32},{"scale":1,"total":15,"initial":15},{"scale":3,"total":36,"initial":12}],"totalSize":83,"quantity":3
  

 "grid":[{"scale":2,"total":80,"initial":40},{"scale":3,"total":75,"initial":25},{"scale":7,"total":105,"initial":15}],"totalSize":260,"quantity":39,"title":"AccSafe Premium Cotton Inspection Glove White 1 dozen "
}];

var xOrigin = origin();
let globalScale;

function setup() {

  //p5js requirements
  createCanvas(400*2,260*2);
  background(205);
  noSmooth();
  stroke(0);

  console.log(packingGuide.length);

  packingGuide.sort( ( a,b ) => {
    return a.totalSize < b.totalSize
  })

  maxSize = packingGuide[0].totalSize;

  if (maxSize > 350) {
    globalScale = 0.6
    // scale(0.6);
  } else if (maxSize > 300) {
    // scale(0.8);
    globalScale = 0.8;
  } else if (maxSize > 250) {
    // scale(1);
    globalScale = 1;
  } else if (maxSize > 200) {
    // scale(1.2);
    globalScale = 1.2;
  } else if (maxSize > 150) {
    // scale(1.4);
    globalScale = 1.4;
  } else if (maxSize > 100) {
    // scale(1.6);
    globalScale = 1.6;
  } else if (maxSize > 50) {
    // scale(1.8);
    globalScale = 1.8;
  }


  //creates (multiple) box(es)
  for(var i = 0; i < packingGuide.length; i++) {
    createBox(packingGuide[i].grid[0].initial, packingGuide[i].grid[1].initial, packingGuide[i].grid[2].initial,
              packingGuide[i].grid[0].scale, packingGuide[i].grid[1].scale, packingGuide[i].grid[2].scale,
              xOrigin[i], 400, 1.3, packingGuide[i].title, packingGuide[i].quantity, packingGuide[i].totalSize);
    
    //scale is adjusted according to largest box
    // if (packingGuide[i].totalSize > maxSize) {
    //   maxSize = packingGuide[i].totalSize;
    // }
  }

  //adjust scale using scale function in p5.jsl
  
  scale(globalScale);

}

//changes x-axis according to number of boxes
function origin() {
  switch(packingGuide.length) {
    case 1: return ([400]); break;
    case 2: return ([266, 533]); break;
    case 3: return ([200, 400, 600]); break;
    case 4: return ([160, 320, 480, 640]); break;
    case 5: return ([133, 266, 399, 533, 665]); break;
    default: console.log('Error: too many boxes');
  }
}

//create box function
function createBox(dWidth, dLength, dHeight, sWidth, sLength, sHeight, xCenter, yCenter, scale, title, quantity, totalsize) {

  //change these values below
  var scaleWidth = sWidth;
  var scaleLength = sLength;
  var scaleHeight = sHeight;

  var dimensionWidth = dWidth;
  var dimensionLength = dLength;
  var dimensionHeight = dHeight;

  originX = xCenter;
  originY = yCenter;

  var windowScale = scale;

  var boxTitle = title;
  var boxQuantity = quantity;
  var boxTotalSize = totalsize;

  //Using 35 degrees
  var sine = 0.57357643;
  var cosine = 0.81915204;
  //change these values above

  var preBoxWidth = dimensionWidth * windowScale;
  var preBoxLength = dimensionLength * windowScale;
  var preBoxHeight = dimensionHeight * windowScale;

  var boxWidth = preBoxWidth * scaleWidth;
  var boxLength = preBoxLength * scaleLength;
  var boxHeight = preBoxHeight * scaleHeight;

  //function calls
  widthSide();
  lengthSide();
  heightSide();
  dimensions();

    //draws lines perpendicular to x-axis on width side(left)
    function widthSide() {
      var x1 = originX;
      var y1 = originY;
      var xwidth = originX - (preBoxWidth * cosine);
      var ywidth = originY - (preBoxWidth * sine);

      for(i = 0; i <= scaleWidth - 1; i++) {
        line(x1, y1, xwidth, ywidth);
        line(x1, y1 - boxHeight, xwidth, ywidth - boxHeight);
        line(xwidth, ywidth - boxHeight, xwidth + (boxLength * cosine), ywidth - (boxLength * sine) - boxHeight);
        line(x1, y1, x1, y1 - boxHeight);
        x1 = xwidth;
        y1 = ywidth;
        xwidth += -preBoxWidth * cosine;
        ywidth += -preBoxWidth * sine;
      }

      line(x1, y1, x1, y1 - boxHeight);
    
    }

    //draws lines perpendicular to x-axis on length side(right)
    function lengthSide() {
      var x1 = originX;
      var y1 = originY;
      var xlength = originX + (preBoxLength * cosine);
      var ylength = originY - (preBoxLength * sine);

      for(i = 0; i <= scaleLength - 1; i++) {
        line(x1, y1, xlength, ylength);
        line(x1, y1 - boxHeight, xlength, ylength - boxHeight);
        line(xlength, ylength - boxHeight, xlength - (boxWidth * cosine), ylength - (boxWidth * sine) - boxHeight);
        line(x1, y1, x1, y1 - boxHeight);
        x1 = xlength;
        y1 = ylength;
        xlength += preBoxLength * cosine;
        ylength += -preBoxLength * sine;
      }

      line(x1, y1, x1, y1 - boxHeight);

    }

    //draws lines perpendicular to height axis
    function heightSide() {
      var x = originX;
      var y = originY - preBoxHeight;
      var xLeft = originX - (boxWidth * cosine);
      var yLeft = originY - (boxWidth * sine) - preBoxHeight;
      var xRight = originX + (boxLength * cosine);
      var yRight = originY - (boxLength * sine) - preBoxHeight;

      for(i = 0; i <= scaleHeight -1; i++) {
        line(x, y, xLeft, yLeft);
        line(x, y, xRight, yRight);
        y -= preBoxHeight;
        yLeft -= preBoxHeight;
        yRight -= preBoxHeight;  
      }
    }

    //draws dimensions and labels them
    function dimensions() {
      var xP4 = originX - (boxWidth * cosine);  var yP4 = originY - (boxWidth * sine);
      var xP5 = originX;                        var yP5 = originY;
      var xP6 = originX + (boxLength * cosine); var yP6 = originY - (boxLength * sine);
      var xP3 = xP6;                            var yP3 = yP6 - boxHeight;
      var xP2 = xP5;                            var yP2 = yP3 - (boxWidth * cosine);

      cFifth = 0.57357643635 * 15; //cos 55 degrees
      sFifth = -0.99975517335 * 15;//sin 55 degrees
      cTen = 0.57357643635 * 10;
      sTen = -0.99975517335 * 10;
      cFive = 0.57357643635 * 5;
      sFive = -0.99975517335 * 5;
      c = 0.57357643635;
      s = -0.99975517335;

      //line for width
      line(xP4 + sFive, yP4 + cFive, xP4 + sFifth, yP4 + cFifth);
      line(xP4 + sTen, yP4 + cTen, xP5 + sTen, yP5 + cTen);
      line(xP5 + sFive, yP5 + cFive, xP5 + sFifth, yP5 + cFifth);

      //line for length
      line(xP5 - sFive, yP5 + cFive, xP5 - sFifth, yP5 + cFifth);
      line(xP5 - sTen, yP5 + cTen, xP6 - sTen, yP6 + cTen);
      line(xP6 - sFive, yP6 + cFive, xP6 - sFifth, yP6 + cFifth);

      //line for height
      line(xP6 - sFive, yP6 - cFive, xP6 - sFifth, yP6 - cFifth);
      line(xP6 - sTen, yP6 - cTen, xP3 - sTen, yP3 - cTen);
      line(xP3 - sFive, yP3 - cFive, xP3 - sFifth, yP3 - cFifth);

      console.log(8 * globalScale, globalScale);
      textSize(10 / globalScale * 1.3); //textSize

      //dimension text for width
      textAlign(RIGHT);
      text('Span: ' + boxWidth/windowScale + 'cm\nCols: ' + scaleWidth, (xP4 + s*20 + xP5 + s*20)/2, (yP4 + c*20 + yP5 + c*20)/2);

      //dimension text for length
      textAlign(LEFT);
      text('Span: ' + boxLength/windowScale + 'cm\nCols: ' + scaleLength, (xP5 - s*20 + xP6 - s*20)/2, (yP5 + c*20 + yP6 + c*20)/2);

      //dimension text for height
      textAlign(LEFT);
      text('Span: ' + boxHeight/windowScale + 'cm\nRows: ' + scaleHeight, (xP6 - s*20 + xP3 - s*20)/2, (yP6 - c*20 + yP3 - c*20)/2);

      //totalsize text
      textAlign(CENTER);
      text('Total (L + W + H): ' + boxTotalSize + 'cm', xP5, yP5 + 30);

      //title and quantity text
      textSize(12 / globalScale * 1.3);
      textAlign(CENTER);
      rectMode(CENTER);
      text(boxTitle + '\nQuantity: ' + boxQuantity + ' unit(s)', xP2, yP2 - 20, 250, 70);
      // stroke(0)
      // strokeWeight(0)
    }
    
  }


console.timeEnd('executetime');