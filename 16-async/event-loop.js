//=== JS는 싱글 스레드

const button = document.querySelector('button');
const output = document.querySelector('p');

// 가장 마지막에 실행됨.
function trackUserHandler() {
  console.log('Clicked!'); // 'result'가 콘솔에 찍혀야지만, 'Clicked!'도 콘솔에 찍힙니다.
}

//; 클릭 이벤트리스너 : 비동기 태스크
//-- 브라우저가 브라우저로 전송 시켜서, JS 코드를 차단하지 않도록 함.
// for loop가 실행되고 있는 상태에서 클릭하면 반응 없음
// => 브라우저가 클릭 이벤트의 콜백함수인 trackUserHandler를 실행 대상으로 메시지큐 대기열에 push
// => event loop 입장에서는 stack에 실행 대상이 있으므로 호출 스택이 빌 때까지 기다림
// => 잠시후 ... 호출 스택이 비어진 다음, console.log(result); 까지 수행된 다음에서야
//    메시지큐 대기열에 있던 trackUserHandler 함수를 실행하게 됨.
button.addEventListener('click', trackUserHandler);

let result = 0;

//; for loop : 시간이 걸리는 작업
// stack에서 실행됨
for (let i = 0; i < 100000000; i++) {
  result += i;
}

console.log(result);

//-- for loop 도는 동안 '클릭'하면,
//-- for loop 연산 끝나고, 클릭 이벤트 실행
