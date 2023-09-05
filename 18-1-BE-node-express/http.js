// HttpRequests로 작업할 수 있도록 하는 모듈
const http = require('http');

const server = http.createServer((request, response) => {
  let body = [];

  console.log('request.method >>>', request.method);
  console.log('request.url >>>', request.url);

  request.on('data', (chunk) => {
    body.push(chunk);
  });

  // 종료되는 시점에 실행됨
  request.on('end', () => {
    body = Buffer.concat(body).toString();
    console.log('body >>>', body);

    let userName = 'Unknown User';

    if (body) {
      userName = body.split('=')[1];
    }

    //_ 서버 측에서 헤더 설정
    response.setHeader('Content-Type', 'text/html');
    // 보내는 응답에 첨부된 'text/html' 있다고 알림.
    // 'text/html' : html 컨텐츠 인식
    // 'text/plain' : 문자로 인식

    //_ 클라이언트 측에서 헤더 설정
    // fetch(url, {
    //   method: method,
    //   body: data, // formData
    //   // http header에 내용 추가
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });

    response.write(
      `<h1>Hi ${userName}</h1><form method="POST" action="/"><input name="username" type="text"><button type="submit">Send</button></form>`
    );

    response.end(); // 응답 끝남
  });
});

server.listen(3000); // 들어오는 요청을 들음
// script가 종료되지 않음 (서버 진행 중)
// 코드 변경 후 서버에 업로드하고 서버 재시작해야 함

console.log('hi');
