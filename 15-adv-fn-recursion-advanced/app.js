//=== 순수 함수 (Pure Functions) ===
function add(num1, num2) {
  return num1 + num2;
}

// function sendDataToServer() {}

console.log(add(1, 5)); // 6
console.log(add(12, 15)); // 27

//] Impure Functions
//; 비순수 함수 1
function addRandom(num1) {
  return num1 + Math.random();
}

console.log(addRandom(5));

//; 비순수 함수 2
let previousResult = 0;

function addMoreNumbers(num1, num2) {
  const sum = num1 + num2;

  //-- side effect
  // 밖에서 정의된 변수를 변경
  previousResult = sum;
  return sum;
}

console.log(addMoreNumbers(1, 5));

//; 비순수 함수 3
const hobbies = ["Sports", "Cooking"];

function printHobbies(h) {
  //-- side effect
  // 객체 : 참조에 의한 복사로 원본도 변경됨
  h.push("NEW HOBBY");
  console.log(h);
}

printHobbies(hobbies);

//] 팩토리 함수
//] 클로저
let multiplier = 1.1;

function createTaxCalculator(tax) {
  function calculateTax(amount) {
    console.log(multiplier); // 1.2
    return amount * tax * multiplier;
  }

  return calculateTax;
}

const calculateVatAmount = createTaxCalculator(0.19);
const calculateIncomeTaxAmount = createTaxCalculator(0.25);

multiplier = 1.2;

console.log(calculateVatAmount(100));
console.log(calculateVatAmount(200));

let userName = "Max";

//] 클로저
function greetUser() {
  // let name = 'Anna';
  console.log("Hi " + name);
}

let name = "Maximilian";

userName = "Manuel";

greetUser();

//] 재귀 함수
//-- for문
// function powerOf(x, n) {
//   let result = 1;

//   for (let i = 0; i < n; i++) {
//     result *= x;
//   }

//   return result;
// }

//-- 재귀 함수 !
function powerOf(x, n) {
  // if (n === 1) {  //) 종결문
  //   return x;
  // }
  // return x * powerOf(x, n - 1);

  return n === 1 ? x : x * powerOf(x, n - 1);
}

console.log(powerOf(2, 3)); // 2 * 2 * 2

//] 고급 재귀 함수
// for문으로 불가
const myself = {
  name: "Max",
  friends: [
    {
      name: "Manuel",
      friends: [
        {
          name: "Chris",
          friends: [
            {
              name: "Hari",
            },
            {
              name: "Amilia",
            },
          ],
        },
      ],
    },
    {
      name: "Julia",
    },
  ],
};

// 재귀 함수
function getFriendNames(person) {
  const collectedNames = [];

  // friends 프로퍼티 없을 경우
  if (!person.friends) {
    return [];
  }

  for (const friend of person.friends) {
    collectedNames.push(friend.name);
    collectedNames.push(...getFriendNames(friend));
  }

  return collectedNames;
}

console.log(getFriendNames(myself));
// ['Manuel', 'Chris', 'Hari', 'Amilia', 'Julia']
