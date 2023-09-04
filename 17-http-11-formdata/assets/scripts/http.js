//=== http 요청 보내기 ===

//; 새로운 XMLHttpRequest 객체 생성
//) new XMLHttpRequest();
const xhr = new XMLHttpRequest();
// xhr.setRequestHeader('Content-Type', 'application/json');

//; 어떤 요청을 보낼지
//)  xhr.open(method, url);
//   1번째 인자 : 사용할 http method
//   2번째 인자 : 요청을 보낼 url
xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');
//  xhr 객체에 url 주소로 GET 요청을 보냄

xhr.responseType = 'json';
// JSON.parse(xhr.response)와 동일

// load event
// 데이터가 로딩되면 (요청이 완료되면) 자동으로 발생하는 이벤트

// 이벤트 핸들러에 함수를 할당 (addEventListener)
xhr.onload = function () {
  //; 2) 데이터를 화면에 출력
  const listElement = document.querySelector('.posts');
  const postTemplate = document.getElementById('single-post');

  //; 1) 서버에서 페칭된 JSON 데이터
  const listOfPosts = xhr.response;
  console.log(listOfPosts); // 서버에서 페칭된 JSON 데이터 출력
  // push() 사용하려면 JSON 데이터를 JavaScript 유형으로 바꿔야 함.
  //) JSON.stringify() : JavaScript --> JSON
  //) JSON.parse() : JSON --> JavaScript
  // [
  //   {
  //     "userId": 1,
  //     "id": 1,
  //     "title": " ... ",
  //     "body": " ... "
  //   },
  // { ... } ]

  //; 2)
  //  모든 게시물마다 각 템플릿을 복제하여 listElement에 추가
  for (const post of listOfPosts) {
    const postEl = document.importNode(postTemplate.content, true); // 깊은 복사
    postEl.querySelector('h2').textContent = post.title.toUpperCase();
    postEl.querySelector('p').textContent = post.body;
    listElement.append(postEl);
  }
};

//; 요청을 전송
xhr.send();
// JSON 형식으로 데이터 수신 받음
// " " 큰 따옴표 형식이어야 함.
