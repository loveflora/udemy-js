//=== http 요청 보내기 ===

const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');
const form = document.querySelector('#new-post form');
const fetchButton = document.querySelector('#available-posts button');
const postList = document.querySelector('ul');

//; HTTP 요청 프로미스화하기
//++ 요청 보내기
function sendHttpRequest(method, url, data) {
  const promise = new Promise((resolve, reject) => {
    //; 새로운 XMLHttpRequest 객체 생성
    //) new XMLHttpRequest();
    const xhr = new XMLHttpRequest();
    // xhr.setRequestHeader('Content-Type', 'application/json');

    //; 어떤 요청을 보낼지
    //)  xhr.open(method, url);
    //   1번째 인자 : 사용할 http method
    //   2번째 인자 : 요청을 보낼 url
    xhr.open(method, url);
    //  xhr 객체에 url 주소로 GET 요청을 보냄

    xhr.responseType = 'json';
    // JSON.parse(xhr.response)와 동일

    // load event
    // 데이터가 로딩되면 (요청이 완료되면) 자동으로 발생하는 이벤트

    // 이벤트 핸들러에 함수를 할당 (addEventListener)
    xhr.onload = function () {
      resolve(xhr.response);
    };

    //; 요청을 전송
    // 3번째 인자 data : 추가적 데이터
    xhr.send(JSON.stringify(data)); // 추가적 데이터를 더함
    // JSON 형식으로 데이터 수신 받음
    // " " 큰 따옴표 형식이어야 함.
  });

  return promise;
}

async function fetchPosts() {
  const responseData = await sendHttpRequest(
    'GET',
    'https://jsonplaceholder.typicode.com/posts'
  );

  //-- 1) 서버에서 페칭된 JSON 데이터
  const listOfPosts = responseData;
  //   console.log(listOfPosts); // 서버에서 페칭된 JSON 데이터 출력
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

  //-- 2) 데이터를 화면에 출력
  //  모든 게시물마다 각 템플릿을 복제하여 listElement에 추가
  for (const post of listOfPosts) {
    const postEl = document.importNode(postTemplate.content, true); // 깊은 복사
    postEl.querySelector('h2').textContent = post.title.toUpperCase();
    postEl.querySelector('p').textContent = post.body;
    postEl.querySelector('li').id = post.id; // 모든 list item 요소에 id 할당
    listElement.append(postEl);
  }
}

//++ POST 요청으로 데이터 보내기
async function createPost(title, content) {
  const userId = Math.random();
  const post = {
    title: title,
    body: content,
    userId: userId,
  };

  // POST : 생성하고자 하는 데이터를 나가는 요청에 추가해야 함
  sendHttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts', post);
  // function sendHttpRequest(method, url, data) {}
}

//++ 클릭 이벤트
fetchButton.addEventListener('click', fetchPosts);

// UI를 통해 요청 trigger하기
// 'ADD' 버튼 누르면 아래 코드 수행
form.addEventListener('submit', (event) => {
  event.preventDefault(); // 브라우저가 form 제출하지 않음.

  const enteredTitle = event.currentTarget.querySelector('#title').value;
  const enteredContent = event.currentTarget.querySelector('#content').value;

  createPost(enteredTitle, enteredContent); // 게시물 추가

  //-- createPost('DUMMY', 'A dummy post !');
  //\ 200 : 요청 성공
  //\ 201 : 요청 성공 후 서버에 리소스가 생성됨.
  //) Request Payload
  // {title: "DUMMY", body: "A dummy post !", userId: 0.7275782649083105}
  // body: "A dummy post !"
  // title: "DUMMY"
  // userId: 0.7275782649083105
});

postList.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    const postId = event.target.closest('li').id;
    sendHttpRequest(
      'DELETE',
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
  }
});
