import { SHORT_FILM_MAX_DURATION } from "./constants";

function filterByKeyWord(keyWord, array) {
  let filteredResult = [];
  const key = keyWord.toLowerCase();

  array.forEach((movie) => {
    const ruNameLow = movie.nameRU ? movie.nameRU.toLowerCase() : movie.nameRU;
    const enNameLow = movie.nameEn ? movie.nameEN.toLowerCase() : movie.nameEN;

    if (ruNameLow.includes(key) || enNameLow.includes(key)) {
      filteredResult.push(movie);
    }
  });
  return filteredResult;
}

function findShorts(movies) {
  let shortMovies = [];

  movies.forEach((movie) => {
    if (movie.duration <= SHORT_FILM_MAX_DURATION) {
      shortMovies.push(movie);
    }
  });
  return shortMovies;
}

export { filterByKeyWord, findShorts };
