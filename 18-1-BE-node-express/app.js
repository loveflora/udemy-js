//] 가져오기
//; require(패키지 or 파일)

// '패키지' 가져오기
// require(패키지명);
const express = require('express');
// import한 패키지(콘텐츠)들을 express 상수에 저장

const app = express();
// express가 제공하는 많은 기능과 함수가 있는 객체

const bodyParser = require('body-parser');
//-- body-parser
// req 본문을 분석하고 req 객체에 추가

// routes 폴더 내부 파일 가져오기
const locationRoutes = require('./routes/location');
// 패키지가 아닌, '파일' 가져오기
// require(상대경로); --> 파일 확장자 작성하면 안됨 !

//-- app.set()
// app 객체에 set() 메서드 호출 --> 전역옵션 설정

//-- ejs 호출
//) app.set('view engine', 'ejs');
// view와 템플릿 분석하는 엔진이 'ejs'
//) app.set('views', 'views');
// views를 'views'라는 폴더에서 찾을 수 있다

//] 미들웨어 등록
//; app.use(함수)
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));  // form 데이터

// 라우터 express에게 알려줌
app.use(locationRoutes);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// app.use((req, res, next) => {
//   res.setHeader('Content-Type', 'text/html');
//   next(); // 요청 중지 원하지 않음. (아직 작업이 완료되지 않음) 다음 미들웨어도 있어서 app.use() 사용할거야. 그러니 멈추지마.
// });

// app.use((req, res, next) => {
//   const userName = req.body.username || 'Unknown User';
//   res.render('index', {
//     user: userName
//   });
// // 여기에서 next() 호출하지 않음 (응답 끝났기 때문)
// });

app.listen(3000);
