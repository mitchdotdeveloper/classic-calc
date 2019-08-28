$(document).ready(initializeApp);

var lastOperation = [];
var calculationArray = [];
var displayArray = [];
var stringNumberToPush = '';
var calculationResult = null;

function initializeApp() {
  applyClickHandlers();
}

function applyClickHandlers() {
  $('.clear').on('click', '.c-clear, .ac-clear', clearButtonHandler);
  $('.number-pad').on('click', '.number, .point', numberButtonHandler);
  $('.operands').on('click', '.operator', operatorButtonHandler);
  $('.pos-neg').on('click', negativeButtonHandler);
  $('.equal').on('click', equalsButtonHandler);
}

function clearButtonHandler(event) {
  var inputtedClear = $(event.currentTarget).text();
  if (inputtedClear === 'AC') {
    calculationArray = [];
    stringNumberToPush = '';
    calculationResult = null;
    displayArray = [];
    lastOperation = [];
  } else {
    displayArray.pop();
    stringNumberToPush = stringNumberToPush.slice(0, -1);
  }
  updateDisplay();
}

function numberButtonHandler(event) {
  var inputtedNumber = $(event.currentTarget).text();

  if (stringNumberToPush[stringNumberToPush.length - 1] !== '.' ||
    inputtedNumber !== '.') {
    stringNumberToPush += inputtedNumber;
    displayArray.push(inputtedNumber);

    updateDisplay();
  }

  lastOperation = [];
}

function operatorButtonHandler(event) {
  var inputtedOperator = $(event.currentTarget).text();

  if (!displayArray.length) {
    return;
  }

  if ('+-*/'.includes(displayArray[displayArray.length - 1])) {
    displayArray.pop();
    calculationArray.pop();
  }

  displayArray.push(inputtedOperator);

  updateDisplay();

  if (stringNumberToPush) {
    calculationArray.push(stringNumberToPush);
  }
  calculationArray.push(inputtedOperator);

  stringNumberToPush = '';
  lastOperation = [];
}

function negativeButtonHandler() {
  if (stringNumberToPush[stringNumberToPush.length - 1] === '-') {
    stringNumberToPush = '';
    displayArray.pop();
  } else if (!stringNumberToPush.length || '+-*/'.includes(stringNumberToPush[stringNumberToPush.length - 1])) {
    stringNumberToPush += '-';
    displayArray.push('-');
  }

  updateDisplay();
}

function equalsButtonHandler() {

  if (calculationArray.length && !lastOperation.length) {
    lastOperation.push(calculationArray[calculationArray.length - 1], stringNumberToPush);
  }

  if (calculationResult && lastOperation.length) {
    calculationArray = [];
    calculationArray.push(calculationResult, lastOperation[0], lastOperation[1]);
  } else {
    calculationArray.push(stringNumberToPush);
  }

  stringNumberToPush = '';
  displayArray = [];

  calculationResult = solve();
  if (calculationResult == 'Infinity' ||
    calculationResult == '-Infinity') {
    calculationResult = 'Error';
  }
  displayArray.push(calculationResult);
  calculationArray = [];

  updateDisplay();
}

function updateDisplay() {
  var displayText = displayArray.join('');
  $('.display').text(displayText);
}

function solve() {
  for (var multDivIndex = 1; multDivIndex < calculationArray.length; ++multDivIndex) {
    if (calculationArray[multDivIndex] === '*' ||
      calculationArray[multDivIndex] === '/') {
      if (!calculationArray[multDivIndex + 1]) {
        calculationArray[multDivIndex + 1] = calculate(calculationArray[multDivIndex - 1], calculationArray[multDivIndex - 1], calculationArray[multDivIndex]);
      } else {
        calculationArray[multDivIndex + 1] = calculate(calculationArray[multDivIndex - 1], calculationArray[multDivIndex + 1], calculationArray[multDivIndex]);
      }
      calculationArray.splice(multDivIndex - 1, 2);
      --multDivIndex;
    }
  }

  for (var addSubIndex = 1; addSubIndex < calculationArray.length; ++addSubIndex) {
    if (calculationArray[addSubIndex] === '+' ||
      calculationArray[addSubIndex] === '-') {
      if (!calculationArray[addSubIndex + 1]) {
        calculationArray[addSubIndex + 1] = calculate(calculationArray[addSubIndex - 1], calculationArray[addSubIndex - 1], calculationArray[addSubIndex]);
      } else {
        calculationArray[addSubIndex + 1] = calculate(calculationArray[addSubIndex - 1], calculationArray[addSubIndex + 1], calculationArray[addSubIndex]);
      }
      calculationArray.splice(addSubIndex - 1, 2);
      --addSubIndex;
    }
  }

  stringNumberToPush += calculationArray[0];
  return calculationArray[0];
}

function calculate(num1, num2, operator) {
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
