// === Set ===
//-- 고유한 값 관리할 때 (중복 막고 싶을 때)
// const ids = new Set(['Hi', 'from', 'set!']);
// ids.add(2);
// if (ids.has('Hi')) {
//   ids.delete('Hi');
// }

// for (const entry of ids.entries()) {
//   console.log(entry[0]);
// }

const person1 = { name: "Max" };
const person2 = { name: "Manuel" };

//=== Map ===
// 객체도 key로 가능
const personData = new Map([[person1, [{ date: "yesterday", price: 10 }]]]);

personData.set(person2, [{ date: "two weeks ago", price: 100 }]);

console.log(personData);
console.log(personData.get(person1));

for (const [key, value] of personData.entries()) {
  console.log(key, value);
}

for (const key of personData.keys()) {
  console.log(key);
}

for (const value of personData.values()) {
  console.log(value);
}

console.log(personData.size);

// === WeakSet() ===
let person = { name: "Max" };
const persons = new WeakSet();
persons.add(person);

// ... some operations
// person = null;

console.log(persons);

// === WeakMap() ===
const personData2 = new WeakMap();
personData2.set(person, "Extra info!");

person = null;

console.log(personData2);
