import { BASE_URL } from "./constants";

class AuthApi {
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

  register({ name, email, password }) {
    return fetch(`${BASE_URL}/signup`, {
      ...this._BASECONFIG,
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    }).then(this._getServerResponse);
  }

  login({ email, password }) {
    return fetch(`${BASE_URL}/signin`, {
      ...this._BASECONFIG,
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
      .then(this._getServerResponse)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          return data;
        }
      });
  }

  checkTokenApi() {
    return fetch(`${BASE_URL}/users/me`, {
      ...this._BASECONFIG,
      method: "GET",
    }).then(this._getServerResponse);
  }
}

const authApi = new AuthApi({
  baseUrl: BASE_URL,
  mode: "cors",
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
});
export default authApi;
