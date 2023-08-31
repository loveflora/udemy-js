const button = document.querySelector('button');
const output = document.querySelector('p');

const getPosition = (opts) => {
  const promise = new Promise((resolve, reject) => {
    // navigator 객체에 geolocation 메소드 활용
    //-- getCurrentPosition : 사용자 위치를 가져옴
    //  - 첫 번째 인자: successCallback
    //  - 두 번째 인자: errorCallback
    //  - 세 번째 인자: opts (가져오는 방법)
    navigator.geolocation.getCurrentPosition(
      //) 비동기 : 브라우저에서 off-load 처리 (Message Queue에 저장됨)
      // console.log('Getting position ...');가 출력되기 이전에, 아래 코드는 실행되지 않음.
      //.. 3-1.
      (success) => {
        resolve(success);
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

const setTimer = (duration) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Done!');
    }, duration);
  });
  return promise;
};

async function trackUserHandler() {
  let positionData;
  let posData;
  let timerData;
  try {
    posData = await getPosition();
    timerData = await setTimer(2000);
  } catch (error) {
    console.log(error);
  }
  console.log(timerData, posData);
  // getPosition()
  //   .then(posData => {
  //     positionData = posData;
  //     return setTimer(2000);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     return 'on we go...';
  //   })
  //   .then(data => {
  //     console.log(data, positionData);
  //   });
  setTimer(1000).then(() => {
    console.log('Timer done!');
  });
  console.log('Getting position...');
}

button.addEventListener('click', trackUserHandler);

// Promise.race([getPosition(), setTimer(1000)]).then(data => {
//   console.log(data);
// });

// Promise.all([getPosition(), setTimer(1000)]).then(promiseData => {
//   console.log(promiseData);
// });

Promise.allSettled([getPosition(), setTimer(1000)]).then((promiseData) => {
  console.log(promiseData);
});

// let result = 0;

// for (let i = 0; i < 100000000; i++) {
//   result += i;
// }

// console.log(result);
