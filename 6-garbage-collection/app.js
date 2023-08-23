const addListenerBtn = document.getElementById("add-listener-btn");
const clickableBtn = document.getElementById("clickable-btn");
const messageInput = document.getElementById("click-message-input");

// 전체 스크립트가 실행될 때 처음 한 번만 만들어짐
//-- 하나의 함수 객체만 만들어짐
function printMessage() {
  const value = messageInput.value;
  console.log(value || "Clicked me!");
}

function addListener() {
  // clickableBtn.addEventListener("click", printMessage);
  //_ 'Add a listener to the other button' 아무리 여러번 클릭해도 하나만 쌓임

  // printMessage를 콜백함수로 넣음 (익명함수 - 즉석에서 만들어짐)
  //-- addEventListener가 실행될 때마다 새로운 객체로 생성됨
  // => 메모리 누수 유발, 수백 개의 함수 객체를 메모리에 가져옴
  // JS에게 익명함수는 기존 함수가 아닌, 새로운 함수임.
  clickableBtn.addEventListener("click", function () {
    const value = messageInput.value;
    console.log(value || "Clicked me!");
  });
  //_ 'Add a listener to the other button' 여러번 클릭한 만큼 쌓임
}

// 스크립트가 실행될 때 한번 실행됨
addListenerBtn.addEventListener("click", addListener);
