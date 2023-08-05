const BEATFILM_URL = "https://api.nomoreparties.co";
// const BASE_URL = "https://api.movies.nomoredomains.xyz";
const BASE_URL = "http://localhost:3000"
const SHORT_FILM_MAX_DURATION = 40;
const RENDERED_BASIC_CARDS = () => {
  const width = window.innerWidth;
  if (width < 768) {
    return 5;
  }
  if (width < 1280) {
    return 8;
  }

  return 12;
};

const RENDERED_MORE_CARD = () => {
  const width = window.innerWidth;

  if (width < 1280) {
    return 2;
  }

  return 3;
};

export {
  BEATFILM_URL,
  BASE_URL,
  SHORT_FILM_MAX_DURATION,
  RENDERED_BASIC_CARDS,
  RENDERED_MORE_CARD,
};
