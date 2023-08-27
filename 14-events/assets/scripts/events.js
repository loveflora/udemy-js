//=== event ===

//-- 1. inline 방식로 이벤트 등록
// 동일요소에 대해 하나만 추가됨
const button = document.querySelector("button");

// button.onclick = function() { ... };

const buttonClickHandler = (event) => {
  // event.target.disabled = true;
  console.log(event);
};

const anotherButtonClickHandler = () => {
  console.log("This was clicked!");
};

// button.onclick = buttonClickHandler;
// button.onclick = anotherButtonClickHandler;

const boundFn = buttonClickHandler.bind(this);

//-- 2. addEventListener
// 동일 요소에 대해 여러 이벤트 추가 가능
button.addEventListener("click", buttonClickHandler);

setTimeout(() => {
  button.removeEventListener("click", buttonClickHandler);
}, 2000);

// button.addEventListener("click", buttonClickHandler);

// setTimeout(() => {
//   button.removeEventListener("click", buttonClickHandler);
// }, 2000);

// buttons.forEach(btn => {
//   btn.addEventListener('mouseenter', buttonClickHandler);
// });

// window.addEventListener('scroll', event => {
//   console.log(event);
// });

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  //
  event.preventDefault();
  console.log(event);
});

const div = document.querySelector("div");

div.addEventListener("mouseenter", (event) => {
  console.log("DIV");
  console.log(event);
});

div.addEventListener(
  "click",
  (event) => {
    console.log("CLICKED DIV");
    console.log(event);
  },
  true,
);

button.addEventListener("click", function (event) {
  //] event 전파 방지
  //; event.stopPropagation();

  // event.stopImmediatePropagation();
  //  - 첫 번째 이벤트 리스너의 다음에 있는 버튼 리스너
  //    같은 요소에 있는 다른 리스너는 더이상 실행 안됨

  console.log("CLICKED BUTTON");
  console.log(event);

  //] this
  //-- e.target (이벤트의 현재 대상)
  console.log(this); // button 태그
  // 화살표함수였다면 당연히 window 찍혔겠죠 ?
});

const listItems = document.querySelectorAll("li");
const list = document.querySelector("ul");

// listItems.forEach(listItem => {
//   listItem.addEventListener('click', event => {
//     event.target.classList.toggle('highlight');
//   });
// });

list.addEventListener("click", function (event) {
  // console.log(event.currentTarget);

  // 이렇게 하면
  // li > h2 > p
  // 각각 따로 먹음
  // event.target.classList.toggle('highlight');

  //] 이벤트 위임 패턴
  //; closest() 사용
  // 한 번에 먹음
  //-- 가장 가까운 li 태그를 반환
  event.target.closest("li").classList.toggle("highlight");

  // 모든 DOM 요소에 존재하는 메소드
  // .submit() : 프로그래밍을 통해 트리거할 경우, submit 이벤트리스너는 건너뜀
  //'' 315. 프로그래밍적으로 DOM 요소 트리거하기
  // form.submit();
  button.click(); // 이벤트리스너 실행됨
  console.log(this); // ul
});
