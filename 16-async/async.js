const button = document.querySelector('button');
const output = document.querySelector('p');

//] 비동기 코드
//; getPosition 함수 선언
// new Promise : 새로운 promise를 생성하고 반환
//-- getCurrentPosition API를 promise로 감싸고 있음. (프로미스화)
//-- => getPosition 함수를 사용하면, getCurrentPosition을 promise식으로 사용할 수 있음.
//--    getPosition().then(() => {})
const getPosition = (opts) => {
  const promise = new Promise((resolve, reject) => {
    // promise로 감싼다.
    // navigator 객체에 geolocation 메소드 활용
    navigator.geolocation.getCurrentPosition(
      //-- getCurrentPosition : 사용자 위치를 가져옴
      //  - 첫 번째 인자: successCallback
      //  - 두 번째 인자: errorCallback
      //  - 세 번째 인자: opts (가져오는 방법)
      //) 비동기 : 브라우저에서 off-load 처리 (Message Queue에 저장됨)
      // console.log('Getting position ...');가 출력되기 이전에, 아래 코드는 실행되지 않음.
      //.. 3-1.
      (success) => {
        resolve(success);
        // getCurrentPosition에서 받은 데이터를 promise에 전달
        // => getPosition().then(성공하면 수행할 코드)
      },
      //.. 3-2.
      (error) => {
        reject(error);
      },
      opts
    );

    //) 비동기 연산 (getCurrentPosition, setTimeout, eventListener, ...)
    // 비동기 연산에 내부에 있는 코드 (비동기 코드) : 비동기 연산 작업이 완료된 이후, 실행됨.
    // 무조건 바로 메시지큐에 들어감 --> 콜 스택이 비어져야지만 ! 실행됨.
    setTimeout(() => {
      console.log('Timer done !'); //.. 2. 비동기 코드 : 비동기 연산 작업이 완료된 이후, 실행됩니다.
    }, 0); // 0 : 콜백함수가 실행되는 최소 시간 (보장된 시간 X)

    //) 브라우저로 전달된 즉시 stack으로 이동하여 실행됨
    console.log('Getting position ...'); //.. 1. 가장 먼저 실행되는 코드 !
  });

  return promise;
};

//] promise
//; setTimer 함수 선언
// new Promise : 새로운 promise를 생성하고 반환
//-- setTimeout API를 promise로 감싸고 있음.
//-- => setTimer 함수를 사용하면, setTimeout을 promise식으로 사용할 수 있음.
//--    setTimer(1000).then(() => {})
const setTimer = (duration) => {
  // promise : js에 내장된 클래스, 생성자 함수
  // promise API : 프로미스가 생성될 때 바로 실행됨.
  // new Promise 생성자에 전달하는 함수'()=>{}'가 바로 실행됨. (생성자 내부에서 호출됨)
  // new Promise(()=>{})
  const promise = new Promise((resolve, reject) => {
    // 함수 본문은 promise가 생성되는 즉시 실행됨.
    setTimeout(() => {
      // resolve 함수 : 성공했을 경우
      resolve('Done!'); // timer가 끝나야 실행됨.
    }, duration);
  });

  // setTimer 함수의 반환값으로 promise를 사용
  return promise;
};

//] async, await
//-- async
async function trackUserHandler() {
  let positionData;
  // getPosition().then((posData) => {positionData = posData}) ... 에서 사용됨
  let posData;
  let timerData;
  //>> try-catch
  try {
    //-- await
    // 반환값 = await 프로미스함수
    posData = await getPosition(); //>> 거부될 경우 --> 바로 catch 블록 실행
    timerData = await setTimer(2000); //>> skip
    //-- [ promise chaining ] : .then() 블록 2개
    //   .then((posData) => {
    //     positionData = posData;
    //     return setTimer(2000); // promise가 보류 중으로 다시 바뀌게 됨.
    //   })
  } catch (error) {
    console.log(error);
  }

  console.log(timerData, posData); // 성공-오류 상관없이 항상 실행됨

  // //] promise chaining
  // //-- .then() : 성공하면 실행할 코드

  // //; getPosition(), setTimer() 함수 실행
  // //-- promise를 생성하고, 반환
  // getPosition()
  //   // 성공하면
  //   //) 1) .then(() => {성공}, () => {실패}) : 두 번째 인자로도 '실패했을 경우 실행할 코드' 받을 수 있음.
  //   .then((posData) => {
  //     positionData = posData;
  //     return setTimer(2000); // promise가 보류 중으로 다시 바뀌게 됨.
  //     // 반환된 setTimer(2000);가 해결될 때까지 다시 기다려야 함.
  //     // => 다음 '.then()'으로 이동
  //   })
  //   //) 2) .catch(() => {}) : 체이닝 사용
  //   .catch((err) => {
  //     console.log(err);
  //     return 'on we go...';
  //   })
  //   // 'return setTimer(2000)'가 성공하면
  //   .then((data) => {
  //     console.log(data, positionData);
  //     // data: 두 번째 promise를 반환하는 setTimer(2000)의 결과(반환된 promise의 데이터)
  //     // positionData: 첫 번째 promise를 반환하는 getPosition()의 결과

  //     //'' [ 거부 ] 눌렀을 경우 "console.log(data, positionData);" 실행 결과
  //     // 1) 첫 번째 then이 실행되지 않고, 첫 번째 catch가 실행됨.
  //     // 2) 두 번째 then이 실행됨.
  //     //    console.log(data, positionData) 출력
  //     //''  on we go... undefined
  //     // (1) data: on we go... --> 첫 번째 catch의 err에서 넘겨 받은 데이터
  //     // (2) positionData: undefined --> 첫 번째 then이 실행되지 않아, positionData에 값이 할당되지 않았음.
  //   });

  setTimer(1000).then(() => {
    console.log('Timer done!');
  });
  console.log('Getting position...');
}

button.addEventListener('click', trackUserHandler);

//=== Promise 메소드 : 프로미스 배열 전달
//] Promise.race()
//-- 가장 빠른 promise 결과를 return
Promise.race([getPosition(), setTimer(1000)]).then((data) => {
  console.log(data); // Done!
  // setTimer(1000)의 반환값 출력됨. ---> getPosition()보다 더 빨리 완료되어서

  //) 참고
  // 1초 이전에 [ 거부 ] 버튼을 빨리 누를 경우,
  // promise가 실패하면서 첫 번째 인자 getPosition()에서 끝남.
  // => 느린 promise가 취소되는 것이 아닌, 결과가 무시된 것이라는 것을 알 수 있음.

  // 하지만 HTTP 요청이 아직 전송 중이라면,
  // 결과 무시됨.
});

//] Promise.all()
//-- 모든 promise의 반환된 데이터들의 조합
// 모든 promise가 실행될 때까지 기다렸다가, 결합된 데이터를 사용하고 싶은 경우 유용
Promise.all([getPosition(), setTimer(1000)]).then((promiseData) => {
  console.log(promiseData); // [Promise, "Done!"]

  //) [ 성공 ] : 모두 해결 || [ 실패 ] : 적어도 하나 거부됨.
  // 만일 하나라도 실패하면 취소함.
});

//] Promise.allSettled()
// 모든 promise가 끝날 때까지 기다림. --> 자세한 요약 출력
// promise 중 하나가 거부되더라도, promise 실행을 취소하지 않고 어떤 promise가 성공했고, 실패했는지에 대한 요약을 제공
Promise.allSettled([getPosition(), setTimer(1000)]).then((promiseData) => {
  console.log(promiseData); // [{ status: "fulfilled", value: {...}}, { status: "fulfilled", value: "Done!"}]
});

// let result = 0;

// for (let i = 0; i < 100000000; i++) {
//   result += i;
// }

// console.log(result);
