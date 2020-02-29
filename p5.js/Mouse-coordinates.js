let clearButton;

let divTable;
let tableHeaders = ['frameCount', 'mouseX', 'pmouseX', 'movedX', 'mouseY', 'pmouseY', 'movedY'];
let tableRows = [];

let lastMovedX;
let lastMovedY;

// Invoked once at startup.
function setup() {
  createCanvas(400, 400);

  clearButton = createButton('Clear (or press space)');
  clearButton.mouseClicked(function() {
    tableRows.length = 0;
    showTable();
  });

  divTable = createDiv();
}

// Invoked for each frame.
function draw() {
  // Exit if the mouse is not in the canvas.
  if (mouseX < 0 || mouseX > width) return;
  if (mouseY < 0 || mouseY > height) return;

  // Erase the canvas.
  background(220);

  drawGrid();
  drawMousePosition();

  let lastRow = tableRows[tableRows.length - 1];
  let newRow = [frameCount, mouseX, pmouseX, movedX, mouseY, pmouseY, movedY];

  // Update the table if something has changed.
  if (lastMovedX !== movedX || lastMovedY !== movedY) {
    tableRows.push(newRow);
    showTable();
    lastMovedX = movedX;
    lastMovedY = movedY;
  }
}

function keyTyped() {
  if (key === ' ') {
    tableRows.length = 0;
    showTable();
  }
}

// Draw the grid.
function drawGrid() {
  push();

  stroke(190);

  // Draw the vertical lines.
  for (x = 0; x < width; x += 50) {
    line(x, 0, x, height);
  }

  // Draw the horizontal lines.
  for (y = 0; y < height; y += 50) {
    line(0, y, width, y);
  }

  pop();
}

// Draw the mouse position with its (x, y) coordinates.
function drawMousePosition() {
  push();

  textSize(18);
  stroke(30);

  // Draw x line.
  stroke(100);
  line(mouseX, 0, mouseX, mouseY);
  if (mouseX > 20 && mouseY > 20) {
    text('x', mouseX - 15, 20);
  }

  // Draw y line.
  line(0, mouseY, mouseX, mouseY);
  if (mouseX > 20 && mouseY > 20) {
    text('y', 0, mouseY - 10);
  }

  // Draw (x, y) coordinates.
  let textX = (width - mouseX > 120) ? mouseX + 10 : mouseX - 130;
  let textY = (mouseY > 30) ? mouseY - 10 : mouseY + 20;
  text('(x=' + mouseX + ', y=' + mouseY + ')', textX, textY);

  pop();
}

// Populate the table with all the recorded mouse positions.
function showTable() {
  let tableHtml = '';
  tableHtml += '<table class="table table-hover">';

  // Generate the header row.
  tableHtml += '<tr>';
  for (colIdx = 0; colIdx < tableHeaders.length; colIdx++) {
    tableHtml += '<th>' + tableHeaders[colIdx] + '</th>';
  }
  tableHtml += '</tr>';

  // Generate the data rows.
  for (rowIdx = tableRows.length - 1; rowIdx >= 0; rowIdx--) {
    // for (rowIdx = 0; rowIdx < tableRows.length; rowIdx++) {
    let row = tableRows[rowIdx];
    tableHtml += '<tr>';
    for (colIdx = 0; colIdx < row.length; colIdx++) {
      tableHtml += '<th>' + row[colIdx] + '</th>';
    }
    tableHtml += '</tr>';
  }

  tableHtml += '</table>';

  divTable.html(tableHtml);
}
