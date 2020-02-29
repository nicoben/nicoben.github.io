let trackMouseMoveCheckbox;
let showMouseEventCheckbox;
let clearButton;

let divTable;
let tableHeaders = ['frameCount', 'what', 'mouseX', 'mouseY', 'event'];
let tableRows = [];

// Invoked once at startup.
function setup() {
  createCanvas(400, 400);

  // Erase the canvas.
  background(220);

  trackMouseMoveCheckbox = createCheckbox('Track mouseMoved', false);
  showMouseEventCheckbox = createCheckbox('Show MouseEvent details', false);

  clearButton = createButton('Clear');
  clearButton.mouseClicked(function() {
    tableRows.length = 0;
    showTable();
  });

  divTable = createDiv();

  textSize(14);
  let y = 20;
  text('Try the following things (over the canvas):', 0, y);
  y += 20;
  text('- move the mouse (with the track checkbox checked)', 0, y);
  y += 20;
  text('- drag the mouse (= move when a button is pressed)', 0, y);
  y += 20;
  text('- press a button and release it', 0, y);
  y += 20;
  text('- click a button', 0, y);
  y += 20;
  text('- double-click a button', 0, y);
  y += 20;
  text('- turn the mouse wheel', 0, y);
  y += 20;

  showTable();
}

// Invoked for each frame.
function draw() {}

// Invoked when the mouse is moved and no buttons are pressed.
// The event parameter is decribed at https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent.
function mouseMoved(event) {
  // Do nothing if we are not tracking the mouse movements.
  if (!trackMouseMoveCheckbox.checked()) return;

  // Do nothing if the mouse is not over the canvas.
  if (mouseX < 0 || mouseX > width) return;
  if (mouseY < 0 || mouseY > height) return;

  tableRows.push([frameCount, 'mouseMoved', mouseX, mouseY, formatMouseEvent(event)]);
  showTable();
}

// Invoked when the mouse is moved and some buttons are pressed.
// The event parameter is decribed at https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent.
function mouseDragged(event) {
  // Do nothing if the mouse is not over the canvas.
  if (mouseX < 0 || mouseX > width) return;
  if (mouseY < 0 || mouseY > height) return;

  tableRows.push([frameCount, 'mouseDragged', mouseX, mouseY, formatMouseEvent(event)]);
  showTable();
}

// Invoked when a mouse button is pressed.
// The event parameter is decribed at https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent.
function mousePressed(event) {
  // Do nothing if the mouse is not over the canvas.
  if (mouseX < 0 || mouseX > width) return;
  if (mouseY < 0 || mouseY > height) return;

  tableRows.push([frameCount, 'mousePressed', mouseX, mouseY, formatMouseEvent(event)]);
  showTable();
}

// Invoked when a mouse button is released.
// The event parameter is decribed at https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent.
function mouseReleased(event) {
  // Do nothing if the mouse is not over the canvas.
  if (mouseX < 0 || mouseX > width) return;
  if (mouseY < 0 || mouseY > height) return;

  tableRows.push([frameCount, 'mouseReleased', mouseX, mouseY, formatMouseEvent(event)]);
  showTable();
}

// Invoked when a mouse button is clicked.
// The event parameter is decribed at https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent.
function mouseClicked(event) {
  // Do nothing if the mouse is not over the canvas.
  if (mouseX < 0 || mouseX > width) return;
  if (mouseY < 0 || mouseY > height) return;

  tableRows.push([frameCount, 'mouseClicked', mouseX, mouseY, formatMouseEvent(event)]);
  showTable();
}

// Invoked when a mouse button is double-clicked.
// The event parameter is decribed at https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent.
function doubleClicked(event) {
  // Do nothing if the mouse is not over the canvas.
  if (mouseX < 0 || mouseX > width) return;
  if (mouseY < 0 || mouseY > height) return;

  tableRows.push([frameCount, 'doubleClicked', mouseX, mouseY, formatMouseEvent(event)]);
  showTable();
}

// Invoked when the mouse wheel is turned.
// The event parameter is decribed at https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent.
function mouseWheel(event) {
  // Do nothing if the mouse is not over the canvas.
  if (mouseX < 0 || mouseX > width) return;
  if (mouseY < 0 || mouseY > height) return;

  tableRows.push([frameCount, 'mouseWheel', mouseX, mouseY, formatMouseEvent(event)]);
  showTable();
}

function formatMouseEvent(event) {
  let res;

  if (showMouseEventCheckbox.checked()) {
    res = '';
    for (let name in event) {
      res += name + ': ' + event[name] + ', ';
    }
  } else {
    res = '...';
  }

  return res;
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
