$(document).ready(initializeApp);

var possibleOperands = '+-*/';
var calculationArray = [];
var displayArray = [];
var stringNumberToPush = '';
var calculationResult = null;

function initializeApp () {
  applyClickHandlers();
}

function applyClickHandlers () {
  $('#c-button').on('click', clearButtonHandler);
  $('#ac-button').on('click', clearButtonHandler);
  $('#number-block').on('click', '.number', numberButtonHandler);
  $('#number-block').on('click', '.decimal', numberButtonHandler);
  $('#operator-column').on('click', '.operator', operatorButtonHandler);
  $('#equals').on('click', equalsButtonHandler);
}

function clearButtonHandler (event) {
  var inputtedClear = $(event.currentTarget).find('p').text();
  if (inputtedClear === 'AC') {
    calculationArray = [];
    stringNumberToPush = '';
    calculationResult = null;
    displayArray = [];
  } else {
    displayArray.pop();
    calculationArray.pop();
  }
  updateDisplay();
}

function numberButtonHandler (event) {
  var inputtedNumber = $(event.currentTarget).find('p').text();

  if (stringNumberToPush[stringNumberToPush.length-1] !== '.') {
    stringNumberToPush += inputtedNumber;
    displayArray.push(inputtedNumber);

    updateDisplay();
  }
}

function operatorButtonHandler(event) {
  var inputtedOperator = $(event.currentTarget).find('p').text();

  if(!displayArray.length) {
    return;
  }

  if (possibleOperands.includes(displayArray[displayArray.length-1])) {
    displayArray.pop();
    calculationArray.pop();
  }
    displayArray.push(inputtedOperator);

    updateDisplay();

    if(stringNumberToPush) {
     calculationArray.push(stringNumberToPush);
    }
    calculationArray.push(inputtedOperator);

    stringNumberToPush = '';
}

function equalsButtonHandler() {
  calculationArray.push(stringNumberToPush);

  stringNumberToPush = '';
  displayArray = [];

  calculationResult = solve();
  if (calculationResult == 'Infinity') {
    calculationResult = 'Error';
  }
  displayArray.push(calculationResult);
  calculationArray = [];

  updateDisplay();
}

function updateDisplay () {
  var displayText = displayArray.join('');
  $('#display-text').text(displayText);
}

function solve () {
  for (var multDivIndex = 1; multDivIndex < calculationArray.length; ++multDivIndex) {
    if (calculationArray[ multDivIndex ] === '*' ||
        calculationArray[ multDivIndex ] === '/') {
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
    if (calculationArray[ addSubIndex ] === '+' ||
      calculationArray[ addSubIndex ] === '-') {
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
