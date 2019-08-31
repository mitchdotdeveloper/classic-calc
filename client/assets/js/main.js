$(document).ready(initializeApp);

var displayArray = [];
var stringNumberToPush = '';
var calculationResult = null;
var lastOperation = [];
var calculationArray = [];
var calculationHistory = [];

function initializeApp() {
  applyClickHandlers();
}

function applyClickHandlers() {
  $('.clear').on('click', '.c-clear, .ac-clear', clearButtonHandler);
  $('.history').on('click', historyButtonHandler);
  $('.number-pad').on('click', '.number, .point', numberButtonHandler);
  $('.operands').on('click', '.operator', operatorButtonHandler);
  $('.pos-neg').on('click', negativeButtonHandler);
  $('.equal').on('click', equalsButtonHandler);
}

function clearButtonHandler(event) {
  var inputtedClear = $(event.currentTarget).text();
  if (inputtedClear === 'AC') {
    allClear();
  } else {
    displayArray.pop();
    stringNumberToPush = stringNumberToPush.slice(0, -1);
  }
  updateDisplay();
}

function allClear () {
  calculationArray = [];
  calculationHistory = [];
  $('.log').empty();
  $('.operator').removeClass('operator-selected');
  stringNumberToPush = '';
  calculationResult = null;
  displayArray = [];
  lastOperation = [];
}

// Toggles whether the history log shows or not
function historyButtonHandler () {
  if ($('.log').hasClass('hide-log')) {
    $('.log').removeClass('hide-log');
  } else {
    $('.log').addClass('hide-log');
  }
}

function numberButtonHandler(event) {
  var inputtedNumber = $(event.currentTarget).text();

  $('.operator').removeClass('operator-selected');

  // Prevents inputting '..' or '4..'
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

  // Prevents inputting operators without preceeding number(s)
  if (!displayArray.length && !$('.operator').hasClass('operator-selected')) {
    return;
  }
  $('.operator').removeClass('operator-selected');

  // If there is a preceeding operator - remove it
  if ('+-*/'.includes(calculationArray[calculationArray.length - 1])) {
    calculationArray.pop();
    calculationHistory.pop();
  }

  $(event.currentTarget).addClass('operator-selected');

  displayArray = [];
  updateDisplay();

  // If there is a preceeding number - add it to the calculationArray
  if (stringNumberToPush) {
    calculationArray.push(stringNumberToPush);
    calculationHistory.push(stringNumberToPush + ' ');
  }
  calculationArray.push(inputtedOperator);
  calculationHistory.push(inputtedOperator + ' ');

  stringNumberToPush = '';
  lastOperation = [];
}

function negativeButtonHandler() {
  // Toggle '-' <-> ''
  if (!stringNumberToPush || !'-'.includes(stringNumberToPush[0])) {
    stringNumberToPush = '-' + stringNumberToPush;
    displayArray.unshift('-');
  } else if (stringNumberToPush[0] === '-') {
    stringNumberToPush = stringNumberToPush.slice(1);
    displayArray.splice(0, 1);
  } else {
    stringNumberToPush = stringNumberToPush.slice(1);
    displayArray.push(stringNumberToPush);
  }

  updateDisplay();
}

function equalsButtonHandler() {
  if (!calculationArray.length && !lastOperation.length) {
    return;
  }
  $('.operator').removeClass('operator-selected');


  if (calculationArray.length && !lastOperation.length) {
    lastOperation.push(calculationArray[calculationArray.length - 1], stringNumberToPush);
  }

  if (calculationResult && lastOperation.length) {
    if (calculationArray[0] * -1 == calculationResult) {
      calculationResult *= -1;
    }

    calculationArray = [];
    calculationHistory = [];
    calculationHistory.push(calculationResult + ' ', lastOperation[0] + ' ', lastOperation[1]);
    calculationArray.push(calculationResult, lastOperation[0], lastOperation[1]);
  } else {
    calculationArray.push(stringNumberToPush);
    calculationHistory.push(stringNumberToPush + ' ');
  }

  stringNumberToPush = '';
  displayArray = [];

  calculationResult = solve();
  if (calculationResult == 'Infinity' ||
    calculationResult == '-Infinity') {
    calculationResult = 'Error';
  }

  calculationHistory.push(' = ' + calculationResult);
  displayArray.push(calculationResult);
  calculationArray = [];

  updateDisplay();
  updateHistory();
}

function updateDisplay() {
  var displayText = displayArray.join('');
  if (displayText.length >= 13) {
    displayText = parseFloat(displayText).toExponential(3).toString();
  }
  $('.display').text(displayText);
}

function updateHistory () {
  var logEntry = $('<p>');

  formatExponentialHistory();
  var logText = calculationHistory.join('');

  logEntry.text(logText);
  $('.log').append(logEntry)

  var log = document.querySelector('.log');
  log.scrollTop = log.scrollHeight;

  calculationHistory = [];
}

function formatExponentialHistory () {
  if (calculationHistory[calculationHistory.length - 1].length >= 14) {
    if (calculationHistory[0].length >= 13) {
      calculationHistory[0] = parseFloat(calculationHistory[0]).toExponential(3).toString() + ' ';
    }
    if (calculationHistory[2].length >= 13) {
      calculationHistory[2] = parseFloat(calculationHistory[2]).toExponential(3).toString() + ' ';
    }
    calculationHistory[3] = calculationHistory[3].slice(2);
    calculationHistory[3] = parseFloat(calculationHistory[3]).toExponential(3).toString();
    calculationHistory[3] = '= ' + calculationHistory[3];
  }
}

function solve() {
  for (var multDivIndex = 1; multDivIndex < calculationArray.length; ++multDivIndex) {
    if (calculationArray[multDivIndex] === '*' ||
      calculationArray[multDivIndex] === '/') {
      if (!calculationArray[multDivIndex + 1]) {
        calculationArray[multDivIndex + 1] = calculate(calculationArray[multDivIndex - 1],
                                                       calculationArray[multDivIndex - 1],
                                                       calculationArray[multDivIndex]);
      } else {
        calculationArray[multDivIndex + 1] = calculate(calculationArray[multDivIndex - 1],
                                                       calculationArray[multDivIndex + 1],
                                                       calculationArray[multDivIndex]);
      }
      calculationArray.splice(multDivIndex - 1, 2);
      --multDivIndex;
    }
  }

  for (var addSubIndex = 1; addSubIndex < calculationArray.length; ++addSubIndex) {
    if (calculationArray[addSubIndex] === '+' ||
      calculationArray[addSubIndex] === '-') {
      if (!calculationArray[addSubIndex + 1]) {
        calculationArray[addSubIndex + 1] = calculate(calculationArray[addSubIndex - 1],
                                                      calculationArray[addSubIndex - 1],
                                                      calculationArray[addSubIndex]);
      } else {
        calculationArray[addSubIndex + 1] = calculate(calculationArray[addSubIndex - 1],
                                                      calculationArray[addSubIndex + 1],
                                                      calculationArray[addSubIndex]);
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

  switch (operator) {
    case '+': return number1 + number2;
    case '-': return number1 - number2;
    case '*': return number1 * number2;
    case '/': return number1 / number2;
  }
}
