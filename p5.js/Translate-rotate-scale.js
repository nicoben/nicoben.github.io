let drawDefault;
let drawResult;
let orderDiv;

let translateXSlider;
let translateYSlider;
let scaleFactorSlider;
let rotateAngleSlider;

let translateValue;
let scaleValue;
let rotateValue;

let transformations = [];

// Invoked once at startup.
function setup() {
  angleMode(DEGREES);

  createCanvas(600, 600);

  drawDefault = createCheckbox('Draw default', true);
  drawDefault.style('display: inline;');
  drawResult = createCheckbox('Draw result', true);
  drawResult.style('display: inline;');

  // Translate
  let translateDiv = createDiv();
  translateButton = createButton('Translate');
  translateButton.parent(translateDiv);
  translateButton.mouseClicked(function() {
    transformations.push('translate');
  });
  translateXSlider = createSlider(-width, width, width / 2);
  translateXSlider.parent(translateDiv);
  translateYSlider = createSlider(-height, height, height / 2);
  translateYSlider.parent(translateDiv);

  translateValue = createSpan('xxx');
  translateValue.parent(translateDiv);

  // Scale
  let scaleDiv = createDiv();
  scaleButton = createButton('Scale');
  scaleButton.parent(scaleDiv);
  scaleButton.mouseClicked(function() {
    transformations.push('scale');
  });
  scaleFactorSlider = createSlider(0.1, 5, 2, 0);
  scaleFactorSlider.parent(scaleDiv);

  scaleValue = createSpan('xxx');
  scaleValue.parent(scaleDiv);

  // Rotate
  let rotateDiv = createDiv();
  rotateButton = createButton('Rotate');
  rotateButton.parent(rotateDiv);
  rotateButton.mouseClicked(function() {
    transformations.push('rotate');
  });
  rotateAngleSlider = createSlider(-360, 360, 45, 0);
  rotateAngleSlider.parent(rotateDiv);

  rotateValue = createSpan('xxx');
  rotateValue.parent(rotateDiv);

  // Status
  orderDiv = createDiv('Transformations: ');

  // Undo
  let undoButton = createButton('Undo');
  undoButton.mouseClicked(function() {
    transformations.pop();
  });

  // Reset
  let resetButton = createButton('Reset');
  resetButton.mouseClicked(function() {
    reset();
  });

  reset();
}

// Invoked for each frame.
function draw() {
  // Erase the canvas.
  background(220);

  translate(5, 5);
  if (drawDefault.checked()) {
    drawGrid(color(255, 0, 0, 75));
    drawHouse(color(255, 0, 0, 75));
  }
  
  translateValue.html(translateXSlider.value() + ', ' + translateYSlider.value());
  scaleValue.html(scaleFactorSlider.value());
  rotateValue.html(rotateAngleSlider.value());

  for (let idx = 0; idx < transformations.length; idx++) {
    switch (transformations[idx]) {
      case "translate":
        translate(translateXSlider.value(), translateYSlider.value());
        break;
      case "scale":
        scale(scaleFactorSlider.value());
        break;
      case "rotate":
        rotate(rotateAngleSlider.value());
        break;
    }
  }

  orderDiv.html('<b>Transformations</b>: ' + transformations.join(', '));

  if (drawResult.checked()) {
    drawGrid(color(0, 0, 255, 150));
    drawHouse(color(0, 0, 255, 75));
  }
}

function reset() {
  drawDefault.checked(true);
  drawResult.checked(true);
  transformations.length = 0;
  translateXSlider.value(width / 2);
  translateYSlider.value(height / 2);
  scaleFactorSlider.value(2);
  rotateAngleSlider.value(45);
}

function drawHouse(col = 150) {
  fill(col);
  noStroke();
  triangle(25, 25, 50, 10, 75, 25); // roof
  rect(35, 20, 5, -8); // chimney
  rect(35, 25, 30, 25); // main
  rect(46, 40, 8, 10); // door
  rect(40, 30, 5, 5); // left window
  rect(55, 30, 5, 5); // right window
}

// Draw the grid.
function drawGrid(col = 190) {
  push();

  stroke(col);

  // Draw the vertical lines.
  strokeWeight(1);
  for (x = -2 * width; x < 2 * width; x += 50) {
    line(x, -2 * height, x, 2 * height);
  }
  strokeWeight(3);
  line(0, -2 * height, 0, 2 * height);

  // Draw the horizontal lines.
  strokeWeight(1);
  for (y = -2 * height; y < 2 * height; y += 50) {
    line(-2 * width, y, 2 * width, y);
  }
  strokeWeight(3);
  line(-2 * width, 0, 2 * width, 0);

  // Draw the origin.
  text('(0, 0)', 5, 15);

  pop();
}
