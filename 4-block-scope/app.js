let name = "Max";

if (name === "Max") {
  let hobbies = ["Sports", "Cooking"];
  console.log(hobbies);
}

//; var
//-- 범위 : Function-scoped

//; let, const
//-- 범위 :  {Block-scoped}
// { 중괄호 } —>{} 내에서만 선언된 변수를 사용할 수 있음. (조건문, 반복문 함수)

function greet() {
  let age = 30;
  let name = "Manuel";
  console.log(name, age, hobbies);
}

console.log(name, hobbies);

greet();
