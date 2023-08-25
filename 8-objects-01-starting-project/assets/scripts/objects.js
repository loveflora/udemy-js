const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');

const movies = [];

// (filter = '') : 특정한 값이 전달되지 않았을 경우에는 빈 문자열이 기본값
const renderMovies = (filter = '') => {
  const movieList = document.getElementById('movie-list');

  if (movies.length === 0) {
    movieList.classList.remove('visible');
    return;
  } else {
    movieList.classList.add('visible');
  }

  movieList.innerHTML = '';

  //++ 검색 기능
  const filteredMovies = !filter
    ? movies // 필터가 설정되지 않았을 경우에는(빈 문자열) 모든 영화 표시
    : movies.filter((movie) => movie.info.title.includes(filter));
  // 검색어

  filteredMovies.forEach((movie) => {
    const movieEl = document.createElement('li');

    //; 객체 구조분해
    // 순서는 상관 없고, key값과 변수명이 일치해야 함
    //-- 동일한 프로퍼티를 여러 장소에서 사용하고 싶은 경우
    const { info, ...otherProps } = movie;

    let { getFormattedTitle } = movie;
    getFormattedTitle = getFormattedTitle.bind(movie);
    // 객체 구조분해로 인해 아래 코드가 보다 간결해짐
    // let text = movie.info.title + ' - ';
    // ==> let text = info.title + ' - ';

    //\ 프로퍼티 존재 여부 확인 (존재하지 않는 프로퍼티에 대해 작업하고 있는건 아닌지, 오류 피하고 싶은 경우)
    //\ or 존재하지 않는 프로퍼티에 dummy default 값을 할당하고자 할 때 사용할 수 있는 방법
    // if(!('info' in movie)) {}
    // if(movie.info === undefined) {}

    // title --> movieTitle로 변경하고 싶으면 ':' 사용
    // const { title: movieTitle } = info;

    // const { getFormattedTitle } = movie;

    let text = getFormattedTitle() + ' - ';

    // 프로퍼티 변경
    for (const key in info) {
      // key명은 자동으로 문자열로 형 변환됨
      if (key !== 'title') {
        // 동적으로 접근
        text = text + `${key}: ${info[key]}`;
      }
    }
    movieEl.textContent = text;
    movieList.append(movieEl);
  });
};

const addMovieHandler = () => {
  const title = document.getElementById('title').value;
  const extraName = document.getElementById('extra-name').value;
  const extraValue = document.getElementById('extra-value').value;

  if (
    title.trim() === '' ||
    extraName.trim() === '' ||
    extraValue.trim() === ''
  ) {
    return;
  }

  const newMovie = {
    info: {
      title, // { title: title값 }
      [extraName]: extraValue,
    },
    id: Math.random().toString(),
    //++ this 사용
    //-- this : info 프로퍼티 안에 title 프로퍼티가 있는 객체
    // getFormattedTitle: function () {
    //   return this.info.title.toUpperCase();
    // },
    getFormattedTitle() {
      return this.info.title.toUpperCase();
    },
  };

  movies.push(newMovie);
  renderMovies();
};

const searchMovieHandler = () => {
  const filterTerm = document.getElementById('filter-title').value;
  renderMovies(filterTerm);
};

addMovieBtn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click', searchMovieHandler);
