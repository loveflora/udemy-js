//] DOM
//< 입력
const addMovieModal = document.getElementById('add-modal'); //< 성능 측면에서 가장 빠른 방법
// const addMovieModal = document.body.children[1];

const startAddMovieButton = document.querySelector('header button');
// const startAddMovieButton = document.querySelector("header").lastElementChild;

const backdrop = document.getElementById('backdrop');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const listRoot = document.getElementById('movie-list');
const deleteMovieModal = document.getElementById('delete-modal');

//< 저장
const movies = [];
const entryTextSection = document.getElementById('entry-text');

//] function

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};

const updateUI = () => {
  if (movies.length === 0) {
    // 비어 있다면
    entryTextSection.style.display = 'block';
  } else {
    entryTextSection.style.display = 'none';
  }
};

const closeMovieDeletionModal = () => {
  toggleBackdrop();
  deleteMovieModal.classList.remove('visible');
};

const deleteMovieHandler = (movieId) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  listRoot.children[movieIndex].remove();
  // listRoot.removeChild(listRoot.children[movieIndex])
  closeMovieDeletionModal();
  updateUI();
};

const startDeleteMovieHandler = (movieId) => {
  deleteMovieModal.classList.add('visible');
  toggleBackdrop();
  const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive');
  let confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

  //: 깊은 복사 (추후 봐야 확실하게 이해될 듯) + .bind() 추가 공부 필요 !
  confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));
  confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');
  // confirmDeletionButton.removeEventListener('click', deleteMovieHandler.bind(null, movieId));  // will not work

  // 이벤트 취소 여러번 클릭하고 -> 추후 추가 버튼 누르면 에러남
  // 이벤트 리스너 정리해주는 작업이 필요함 : removeEventListener
  cancelDeletionButton.removeEventListener('click', closeMovieDeletionModal);

  cancelDeletionButton.addEventListener('click', closeMovieDeletionModal);
  confirmDeletionButton.addEventListener(
    'click',
    deleteMovieHandler.bind(null, movieId)
  );
  //  deleteMovie(movieId);
};

const renderNewMovieElement = (id, title, imgURL, rating) => {
  const newMovieElement = document.createElement('li');
  newMovieElement.className = 'movie-element';
  newMovieElement.innerHTML = `
   <div class="movie-element__image">
    <img src="${imgURL}" alt="${title}">
   </div>
   <div class="movie-element__info">
    <h2>${title}</h2>
    <p>${rating}/5 stars</p>
   </div>
  `;
  newMovieElement.addEventListener(
    'click',
    startDeleteMovieHandler.bind(null, id)
  );
  listRoot.append(newMovieElement);
};

const closeMovieModal = () => {
  addMovieModal.classList.remove('visible');
};

const showMovieModal = () => {
  addMovieModal.classList.add('visible');
  toggleBackdrop();
};

const backdropClickHandler = () => {
  closeMovieModal();
  closeMovieDeletionModal();
  clearMovieInput();
};

const cancelAddMovieHandler = () => {
  closeMovieModal();
  toggleBackdrop();
  clearMovieInput();
};

const clearMovieInput = () => {
  for (const usrInput of userInputs) {
    usrInput.value = '';
  }
};

const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imgUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    titleValue.trim() === '' ||
    imgUrlValue.trim() === '' ||
    ratingValue.trim() === '' ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert('Please enter valid values (rating between 1 and 5).');
    return;
  }

  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imgUrlValue,
    rating: ratingValue,
  };

  movies.push(newMovie);
  // console.log(newMovie);
  closeMovieModal();
  toggleBackdrop();
  clearMovieInput();
  renderNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.image,
    newMovie.rating
  );
  updateUI();
};

// eventListener 버튼 클릭해야 호출되는 함수는 handler 붙이기
startAddMovieButton.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);
