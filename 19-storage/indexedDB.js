const storeBtn = document.getElementById('store-btn');
const retrBtn = document.getElementById('retrieve-btn');

let db;

const dbRequest = indexedDB.open('StorageDummy', 1);
//_ indexedDB.open('저장소명', 버전)
// 처음 : DB 새로 생성
// 기존 연결

//_ .onsuccess
// 성공적으로 open 요청되었을 때 실행
dbRequest.onsuccess = function (event) {
  db = event.target.result;
};

dbRequest.onupgradeneeded = function (event) {
  db = event.target.result;

  const objStore = db.createObjectStore('products', { keyPath: 'id' });

  objStore.transaction.oncomplete = function (event) {
    const productsStore = db
      .transaction('products', 'readwrite')
      .objectStore('products');

    productsStore.add({
      id: 'p1',
      title: 'A First Product',
      price: 12.99,
      tags: ['Expensive', 'Luxury'],
    });
  };
};

//_ .onerror
// open이 실패되었을 때
dbRequest.onerror = function (event) {
  console.log('ERROR!');
};

// 추가하기
storeBtn.addEventListener('click', () => {
  if (!db) {
    return;
  }
  const productsStore = db
    .transaction('products', 'readwrite')
    .objectStore('products');
  productsStore.add({
    id: 'p2',
    title: 'A Second Product',
    price: 122.99,
    tags: ['Expensive', 'Luxury'],
  });
});

retrBtn.addEventListener('click', () => {
  const productsStore = db
    .transaction('products', 'readwrite')
    .objectStore('products');

  const request = productsStore.get('p2');

  request.onsuccess = function () {
    console.log(request.result);
  };
});
