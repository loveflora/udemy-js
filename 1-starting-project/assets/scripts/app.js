const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];

// Gets input from input field
function getUserNumberInput() {
  return parseInt(usrInput.value);
}

// Generates and writes calculation log
function createAndWriteOutput(operator, resultBeforeCalc, calcNumber) {
  const calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`;
  outputResult(currentResult, calcDescription); // from vendor file
}

function writeToLog(
  operationIdentifier,
  prevResult,
  operationNumber,
  newResult,
) {
  const logEntry = {
    operation: operationIdentifier,
    prevResult: prevResult,
    number: operationNumber,
    result: newResult,
  };
  logEntries.push(logEntry);
  console.log(logEntries);
}

// function calculateResult(calculationType) {
//   const enteredNumber = getUserNumberInput();
//   const initialResult = currentResult;
//   let mathOperator;
//   if (
//     (calculationType !== 'ADD' &&
//       calculationType !== 'SUBTRACT' &&
//       calculationType !== 'MULTIPLY' &&
//       calculationType !== 'DIVIDE') ||
//     // 0을 입력할 경우
//     !enteredNumber //. !0 === true 라서 return 종료됨) {
//   ) {
//     return;
//   } else if (calculationType === 'ADD') {
//     currentResult += enteredNumber;
//     mathOperator = '+';
//   } else if (calculationType === 'SUBTRACT') {
//     currentResult -= enteredNumber;
//     mathOperator = '-';
//   } else if (calculationType === 'MULTIPLY') {
//     currentResult *= enteredNumber;
//     mathOperator = '*';
//   } else if (calculationType === 'DIVIDE') {
//     currentResult /= enteredNumber;
//     mathOperator = '/';
//   }

//   createAndWriteOutput(mathOperator, initialResult, enteredNumber);
//   writeToLog(calculationType, initialResult, enteredNumber, currentResult);
// }

// function add() {
//   calculateResult('ADD');
// }

// function subtract() {
//   calculateResult('SUBTRACT');
// }

// function multiply() {
//   calculateResult('MULTIPLY');
// }

// function divide() {
//   calculateResult('DIVIDE');
// }

// addBtn.addEventListener('click', add);
// subtractBtn.addEventListener('click', subtract);
// multiplyBtn.addEventListener('click', multiply);
// divideBtn.addEventListener('click', divide);

function calculate(operation) {
  const enteredNumber = getUserNumberInput();
  const initialResult = currentResult;
  let operator;
  if (operation === "ADD") {
    currentResult += enteredNumber;
    operator = "+";
  } else if (operation === "SUBTRACT") {
    currentResult -= enteredNumber;
    operator = "-";
  } else if (operation === "MULTIPLY") {
    currentResult *= enteredNumber;
    operator = "*";
  } else {
    currentResult /= enteredNumber;
    operator = "/";
  }
  createAndWriteOutput(operator, initialResult, enteredNumber);
  writeToLog(operation, initialResult, enteredNumber, currentResult);
}

//] bind 활용
addBtn.addEventListener("click", calculate.bind(this, "ADD"));
subtractBtn.addEventListener("click", calculate.bind(this, "SUBTRACT"));
multiplyBtn.addEventListener("click", calculate.bind(this, "MULTIPLY"));
divideBtn.addEventListener("click", calculate.bind(this, "DIVIDE"));
