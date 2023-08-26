const startGameBtn = document.getElementById("start-game-btn");

const ROCK = "ROCK";
const PAPER = "PAPER";
const SCISSORS = "SCISSORS";
const DEFAULT_USER_CHOICE = ROCK;

const RESULT_DRAW = "DRAW";
const RESULT_PLAYER_WINS = "PLAYER_WINS";
const RESULT_COMPUTER_WINS = "COMPUTER_WINS";

let gameIsRunning = false;

const getPlayerChoice = () => {
  const selection = prompt(
    `${ROCK}, ${PAPER} or ${SCISSORS}?`,
    "",
  ).toUpperCase();
  if (selection !== ROCK && selection !== PAPER && selection !== SCISSORS) {
    alert(`Invalid choice! We chose ${DEFAULT_USER_CHOICE} for you!`);
    return;
  }
  return selection;
};

const getComputerChoice = () => {
  const randomValue = Math.random();
  if (randomValue < 0.34) {
    return ROCK;
  } else if (randomValue < 0.67) {
    return PAPER;
  } else {
    return SCISSORS;
  }
};

const getWinner = (cChoice, pChoice = DEFAULT_USER_CHOICE) =>
  cChoice === pChoice
    ? RESULT_DRAW
    : (cChoice === ROCK && pChoice === PAPER) ||
      (cChoice === PAPER && pChoice === SCISSORS) ||
      (cChoice === SCISSORS && pChoice === ROCK)
    ? RESULT_PLAYER_WINS
    : RESULT_COMPUTER_WINS;

// if (cChoice === pChoice) {
//   return RESULT_DRAW;
// } else if (
//   (cChoice === ROCK && pChoice === PAPER) ||
//   (cChoice === PAPER && pChoice === SCISSORS) ||
//   (cChoice === SCISSORS && pChoice === ROCK)
// ) {
//   return RESULT_PLAYER_WINS;
// } else {
//   return RESULT_COMPUTER_WINS;
// }

startGameBtn.addEventListener("click", () => {
  if (gameIsRunning) {
    return;
  }

  gameIsRunning = true;
  console.log("Game is starting...");

  const playerChoice = getPlayerChoice();
  const computerChoice = getComputerChoice();
  let winner;

  if (playerChoice) {
    winner = getWinner(computerChoice, playerChoice);
  } else {
    // undefined
    winner = getWinner(computerChoice); // default = DEFAULT_USER_CHOICE
  }
  let message = `You picked ${
    playerChoice || DEFAULT_USER_CHOICE
  }, computer picked ${computerChoice}, therefore you `;
  if (winner === RESULT_DRAW) {
    message = message + "had a draw.";
  } else if (winner === RESULT_PLAYER_WINS) {
    message = message + "won.";
  } else {
    message = message + "lost.";
  }
  alert(message);

  gameIsRunning = false;
});

// not related to game

//] .bind()
// 즉시 실행하려면 'showResult()'
//-- bind는 즉시 실행되는게 아니라, 나중에 실행될 준비를 하는 것임.

//; 1) combine 함수 : 연산 실행
const combine = (resultHandler, operation, ...numbers) => {
  const validateNumber = (number) => {
    return isNaN(number) ? 0 : number;
  };

  let sum = 0;
  for (const num of numbers) {
    if (operation === "ADD") {
      sum += validateNumber(num);
    } else {
      sum -= validateNumber(num);
    }
  }
  resultHandler(sum);
};

// const subtractUp = function(resultHandler, ...numbers) {
//   let sum = 0;
//   for (const num of numbers) {
//     // don't use that
//     sum -= num;
//   }
//   resultHandler(sum, 'The result after adding all numbers is');
// };

//; 2) showResult 함수
const showResult = (messageText, result) => {
  alert(messageText + " " + result);
};

//; 3) bind(this, '...', a1, a2, a3, a4, ...)
// The result after adding all numbers is: 19
combine(
  showResult.bind(this, "The result after adding all numbers is:"),
  "ADD",
  1,
  5,
  "fdsa",
  -3,
  6,
  10,
);
combine(
  showResult.bind(this, "The result after adding all numbers is:"),
  "ADD",
  1,
  5,
  10,
  -3,
  6,
  10,
  25,
  88,
);
combine(
  showResult.bind(this, "The result after subtracting all numbers is:"),
  "SUBTRACT",
  1,
  10,
  15,
  20,
);

// 구문 분석을 하자면,
// 1) combine 함수를 실행
// 2) showResult에 bind : 나중에 실행
// 3) bind(this, '...', a1, a2, a3, a4, ...)

//) 실행 순서
// 1) 연산실행해주는 combine(showResult.bind(this, "..."), "ADD", 1, 2, 3, ...)
//    const combine = (resultHandler, operation, ...numbers) => {};
//--  (1) resultHandler : showResult.bind()
//    (2) operation : "ADD"
//    (3) ...numbers : 1, 2, 3, ...

// 2) showResult.bind(this, '...', a1, a2, a3, a4, ...)
//     combine(xxx.bind(this)) : this(combine)은 나중에 실행해줘
//     "나중에 combine(연산)해줘" --> xxx먼저 실행 (text 인자 먼저 들어가고) --> 이후 인자들은 combine 갔다가 다시 돌아옴

//    const showResult = (messageText, result) => {};
//    (1) messageText : "The result after subtracting all numbers is:"
//    (2) result : combine 실행 후의 결과 (나중에 보내지는 인자)
