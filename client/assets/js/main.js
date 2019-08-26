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
}

function equalsButtonHandler(event) {
  calculationArray.push(stringNumberToPush);
  stringNumberToPush = '';
  displayArray = [];

  var answer = calculate(calculationArray[0], calculationArray[2], calculationArray[1]);
  console.log(answer);
}

function updateDisplay () {
  var displayText = displayArray.join('');
  $('#display-text').text(displayText);
}

function calculate (num1, num2, operator) {
  var number1 = parseFloat(num1);
  var number2 = parseFloat(num2);
  var result = null;

  switch (operator) {
    case '+':
      result = number1 + number2;
      break;
    case '-':
      result = number1 - number2;
      break;
    case '*':
      result = number1 * number2;
      break;
    case '/':
      result = number1 / number2;
      break;
  }
  return result;
}
