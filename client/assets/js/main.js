$(document).ready(initializeApp);

var calculationArray = [];
var displayArray = [];
var stringNumberToPush = '';
var calculationResult = null;

function initializeApp () {
  applyClickHandlers();
}

function applyClickHandlers () {
  $('#number-block').on('click', '.number', numberButtonHandler);
  $('#operator-column').on('click', '.operator', operatorButtonHandler);
  $('#equals').on('click', equalsButtonHandler);
}

function numberButtonHandler (event) {
  var inputtedNumber = '';
  inputtedNumber = $(event.currentTarget).find('p').text();
  stringNumberToPush += inputtedNumber;
  displayArray.push(inputtedNumber);
  updateDisplay();
}

function operatorButtonHandler(event) {
  var inputtedOperator = '';
  inputtedOperator = $(event.currentTarget).find('p').text();
  displayArray.push(inputtedOperator);
  updateDisplay();
  calculationArray.push(stringNumberToPush);
  calculationArray.push(inputtedOperator);
  stringNumberToPush = '';
  console.log(calculationArray);
}

function equalsButtonHandler(event) {
  console.log(event);
}

function updateDisplay () {
  var displayText = displayArray.join('');
  $('#display-text').text(displayText);
}
