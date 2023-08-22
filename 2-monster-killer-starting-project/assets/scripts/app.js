//* 전역 정적 값 : 대문자 처리
const ATTACK_VALUE = 10; // 최대 공격력
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

// 전역 상수 식별자 (문자열로 오타내 확률 적어짐)
const MODE_ATTACK = 'ATTACK'; // MODE_ATTACK = 0
const MODE_STRONG_ATTACK = 'STRONG_ATTACK'; // MODE_STRONG_ATTACK = 1
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

let battleLog = [];

//=== 'Try-catch' 사용해 오류 잡고 처리하기 ===
// 오류 발생 여부를 제어할 수 없을 경우 사용
// (사용자 입력값 오류는 제어할 수 없으므로, try-catch 사용)
function getMaxLifeValues() {
  // prompt : 문자열
  const enteredValue = prompt('Maximum life for you and the monster.', '100');

  // 사용자가 설정가능
  let parsedValue = Number(enteredValue);
  //\ parseInt() : 숫자, 문자 중에서 '숫자'만 인식하여 return (하지만 문자가 앞에 있는 경우는 불가)
  //\ Number() : 무조건 숫자로 이루어진 것만 숫자로 return, 소수점도 인식
  // 유효하지 않은 값 입력 시
  if (isNaN(parsedValue) || parsedValue <= 0) {
    //++ throw
    // 콘솔창에 시스템 오류메세지
    // 아예 작동 X
    throw { message: 'invalid user input, not a number !' };
  }
  console.log(parsedValue);
  return parsedValue;
}

let chosenMaxLife;

try {
  //++ try
  //_ 오류 발생시킬 수 있는 코드
  chosenMaxLife = getMaxLifeValues();
} catch (error) {
  //++ catch
  //_ fallback (실패했을 때 실행할 코드. 예외처리)
  //_ 자체 오류처리 로직 사용
  // 시스템 오류가 아닌 일반적인 로그 메세지 뜸.
  // 작동 O
  console.log(error);
  chosenMaxLife = 100;
  alert('You entered something wrong, default value of 100 was used.');
  //,, throw error (오류 재발생, 자체 분석 서버로 오류를 보내서 기록)
}
//++ finally
// 오류가 있든 없든 항상 실행 (try-catch 내부에서 오류 발생시켜도, finally는 실행됨)
// try-catch 내부에서 오류가 또 발생할 수 있음
// try-catch 내부에서 오류 발생시키면 이후의 코드는 실행 안되고, finally 내부 코드만 실행됨.
// 완벽한 fallback이 없을 경우, finally 사용 (클린업 작업)

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
// boolean 값 나타내는 경우에는 동사 사용 (has, is ...)
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

//=== 함수 정의 ===
function writeToLog(ev, val, monsterHealth, playerHealth) {
  let logEntry = {
    event: ev,
    value: val,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth,
  };
  switch (ev) {
    case LOG_EVENT_PLAYER_ATTACK:
      logEntry.target = 'MONSTER';
      break;

    case LOG_EVENT_PLAYER_STRONG_ATTACK:
      logEntry.target = 'MONSTER';
      break;

    case LOG_EVENT_MONSTER_ATTACK:
      logEntry.target = 'PLAYER';
      break;

    case LOG_EVENT_PLAYER_HEAL:
      logEntry.target = 'PLAYER';
      break;

    case LOG_EVENT_GAME_OVER:
      break;
    default:
      logEntry = {};
  }
  battleLog.push(logEntry);
}

function reset() {
  hasBonusLife = true;
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  addBonusLife();
  resetGame(chosenMaxLife);
  console.log(hasBonusLife);
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    playerDamage,
    currentMonsterHealth,
    currentPlayerHealth
  );

  //++ BonusLife
  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert('You would be dead but the bonus life saved you !');
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('You won!');
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'PLAYER WON',
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('You lost!');
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'MONSTER LOST',
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert('You have a draw!');
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'A DRAW',
      currentMonsterHealth,
      currentPlayerHealth
    );
  }

  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
  }
}

function attackMonster(mode) {
  //_ 삼항 연산자 사용
  const maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
  const logEvent =
    mode === MODE_ATTACK
      ? LOG_EVENT_PLAYER_ATTACK
      : LOG_EVENT_PLAYER_STRONG_ATTACK;

  // let maxDamage;
  // let logEvent;
  // if (mode === MODE_ATTACK) {
  //   maxDamage = ATTACK_VALUE;
  //   logEvent = LOG_EVENT_PLAYER_ATTACK;
  // } else if (mode === MODE_STRONG_ATTACK) {
  //   maxDamage = STRONG_ATTACK_VALUE;
  //   logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
  // }

  // 함수 스코프 내에서는 (함수가 실행되는 도중에는) 바뀌지 않으므로 상수 const
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  writeToLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth);
  endRound();
}

// 보통 addEventListener 와 같은 이벤트 핸들러에 연결되는 경우, Handler 많이 붙임
function attackHandler() {
  attackMonster(MODE_ATTACK);
}

function strongAttackHandler() {
  attackMonster(MODE_STRONG_ATTACK);
}

function healPlayerHandler() {
  // 최대치 넘을 경우, 최대치까지만 체력바 증가
  //   ex. 체력바 90인 경우, 최대치 100까지만 증가 (+10)
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("You can't heal more than your max initial health.");
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }

  // UI 체력바 증가
  increasePlayerHealth(healValue);

  // 체력바 실제 업데이트
  currentPlayerHealth += healValue;
  writeToLog(
    LOG_EVENT_PLAYER_HEAL,
    healValue,
    currentMonsterHealth,
    currentPlayerHealth
  );
  endRound();

  console.log(healValue);
}

function printLogHandler() {
  for (let i = 0; i < 3; i++) {}
  console.log(battleLog);
}

let i = 0;
for (const logEntry of battleLog) {
  console.log(`#${i}`);
  for (const key in logEntry) {
    console.log(`${key} : ${logEntry[key]}`);
  }
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);
