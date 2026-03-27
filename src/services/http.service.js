import { Exception } from "../exceptions/exception.js";

export class HTTPService {
  constructor(config) {
    this.config = config;
  }

  get(path, params) {
    const query = new URLSearchParams(params);
    const token = localStorage.getItem("sessionToken");
    const headers = {};
    if (token) {
      headers.token = token;
    }

    return fetch(`${this.config.url}/${path}?${query}`, { headers })
      .then(async (response) => {
        const body = await response.json();
        if (!response.ok) {
          throw new Exception({
            httpCode: response.status,
            errorMessage: body.errorMessage,
          });
        }
        return body;
      })
      .catch((error) => {
        console.log(error);
        if (error instanceof Exception) {
          throw error;
        }
        throw new Exception({
          httpCode: 0,
          errorMessage: error?.message ?? "Network error",
        });
      });
  }

  post(path, params) {
    const token = localStorage.getItem("sessionToken");
    const headers = {
      "Content-Type": "application/json; charset=UTF-8",
    };
    if (token) headers.token = token;

    return fetch(`${this.config.url}/${path}`, {
      method: "POST",
      body: JSON.stringify(params),
      headers,
    })
      .then(async (response) => {
        const body = await response.json();
        if (!response.ok) {
          throw new Exception({
            httpCode: response.status,
            errorMessage: body.errorMessage,
          });
        }
        return body;
      })
      .catch((error) => {
        console.log(error);
        if (error instanceof Exception) {
          throw error;
        }
        throw new Exception({
          httpCode: 0,
          errorMessage: error?.message ?? "Network error",
        });
      });
  }

  put(path, params) {
    const token = localStorage.getItem("sessionToken");
    const headers = {
      "Content-Type": "application/json; charset=UTF-8",
    };
    if (token) headers.token = token;

    return fetch(`${this.config.url}/${path}`, {
      method: "PUT",
      body: JSON.stringify(params),
      headers,
    })
      .then(async (response) => {
        const body = await response.json();
        if (!response.ok) {
          throw new Exception({
            httpCode: response.status,
            errorMessage: body.errorMessage,
          });
        }
        return body;
      })
      .catch((error) => {
        console.log(error);
        if (error instanceof Exception) {
          throw error;
        }
        throw new Exception({
          httpCode: 0,
          errorMessage: error?.message ?? "Network error",
        });
      });
  }

  delete(path, params) {
    const token = localStorage.getItem("sessionToken");
    const headers = {
      "Content-Type": "application/json; charset=UTF-8",
    };
    if (token) headers.token = token;

    return fetch(`${this.config.url}/${path}`, {
      method: "DELETE",
      body: JSON.stringify(params),
      headers,
    })
      .then(async (response) => {
        const body = await response.json();
        if (!response.ok) {
          throw new Exception({
            httpCode: response.status,
            errorMessage: body.errorMessage,
          });
        }
        return body;
      })
      .catch((error) => {
        console.log(error);
        if (error instanceof Exception) {
          throw error;
        }
        throw new Exception({
          httpCode: 0,
          errorMessage: error?.message ?? "Network error",
        });
      });
  }
}
