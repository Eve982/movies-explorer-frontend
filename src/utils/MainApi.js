import { BEATFILM_URL, BASE_URL } from "../utils/constants";

class MainApi {
  constructor({ baseUrl, mode, credentials, headers }) {
    this._BASECONFIG = { mode, credentials, headers };
    this._baseUrl = baseUrl;
    this._getServerResponse = this._getServerResponse.bind(this);
  }

  _getServerResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then((data) => {
        return Promise.reject(data);
      });
    }
  }

  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies/saved-movies`, this._BASECONFIG).then(
      this._getServerResponse,
    );
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, this._BASECONFIG).then(
      this._getServerResponse,
    );
  }

  updateUserInfo({ name, email }) {
    return fetch(`${this._baseUrl}/users/me`, {
      ...this._BASECONFIG,
      method: "PATCH",
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    }).then(this._getServerResponse);
  }

  saveMovie(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      ...this._BASECONFIG,
      method: "POST",
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `${BEATFILM_URL}${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `${BEATFILM_URL}${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    }).then(this._getServerResponse);
  }

  deleteMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      ...this._BASECONFIG,
      method: "DELETE",
    }).then(this._getServerResponse);
  }
}

const mainApi = new MainApi({
  baseUrl: BASE_URL,
  // method: "GET",
  mode: "cors",
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
});
export default mainApi;
