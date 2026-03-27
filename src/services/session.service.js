export class SessionService {
  constructor(httpService) {
    this.httpService = httpService;
  }

  /**
   * @param {{ email: string, password: string }} credentials
   * @returns {Promise<{ token: string, user: { id: number, name: string, username: string, email: string, isAdmin: boolean } }>}
   */
  login(credentials) {
    return this.httpService.post("login", credentials).then((response) => {
      localStorage.setItem("sessionToken", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      return response;
    });
  }

  logout() {
    localStorage.removeItem("sessionToken");
    localStorage.removeItem("user");
    window.location.href = "/views/login.html";
  }

  /**
   * @returns {{ id: number, name: string, username: string, email: string, isAdmin: boolean } | null}
   */
  getStoredUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn() {
    return !!localStorage.getItem("sessionToken");
  }
}
