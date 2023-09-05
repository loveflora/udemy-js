const storeBtn = document.getElementById('store-btn');
const retrBtn = document.getElementById('retrieve-btn');

storeBtn.addEventListener('click', () => {
  const userId = 'u123';
  const user = { name: 'Max', age: 30 };
  // document.cookie : 저장된 모든 쿠키
  document.cookie = `uid=${userId}; max-age=360`; // 만료 설정
  document.cookie = `user=${JSON.stringify(user)}`;
});

retrBtn.addEventListener('click', () => {
  console.log(document.cookie);
  const cookieData = document.cookie.split(';');
  const data = cookieData.map((i) => {
    return i.trim(); // 공백 제거
  });
  console.log(data[1].split('=')[1]); // user value
  // {"name":"Max","age":30}
});
