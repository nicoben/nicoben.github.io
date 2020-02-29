let clearButton;

let divTable;
let tableHeaders = ['frameCount', 'what', 'key', 'keyCode'];
let tableRows = [];

// Invoked once at startup.
function setup() {
  createCanvas(400, 400);

  // Erase the canvas.
  background(220);

  clearButton = createButton('Clear');
  clearButton.mouseClicked(function() {
    tableRows.length = 0;
    showTable();
  });

  divTable = createDiv();

  textSize(14);
  let y = 20;
  text('Try the following things:', 0, y);
  y += 20;
  text('- press a single letter', 0, y);
  y += 20;
  text('- press Shift or Control', 0, y);
  y += 20;
  text('- press Enter', 0, y);
  y += 20;
  text('- press Space', 0, y);
  y += 20;

  showTable();
}

// Invoked for each frame.
function draw() {
  if (keyIsPressed) {
    console.info('key = ' + key + ', keyCode = ' + keyCode);
  }
  
  if (keyIsDown(ENTER)) {
    console.info('The Enter key is down');
  }
}

function keyPressed() {
  tableRows.push([frameCount, 'keyPressed', key, keyCode]);
  showTable();
}

function keyReleased() {
  tableRows.push([frameCount, 'keyReleased', key, keyCode]);
  showTable();
}

function keyTyped() {
  tableRows.push([frameCount, 'keyTyped', key, keyCode]);
  showTable();
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
