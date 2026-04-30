import { User } from "../models/user.js";

export class SessionService {
  /**
   * @param {string} token
   * @param {{ id: number, name: string, username: string, email: string, isAdmin: boolean }} user
   * @returns {void}
   */
  store(token, user) {
    localStorage.setItem("sessionToken", token);
    localStorage.setItem("user", JSON.stringify(user));
  }

  /**
   * @returns {User | null}
   */
  getCurrentUser() {
    const stored = localStorage.getItem("user");
    return stored ? new User(JSON.parse(stored)) : null;
  }

  /**
   * @returns {void}
   */
  logout() {
    this.clear();
    window.location.href = "/templates/login.html";
  }

  /**
   * @returns {void}
   */
  clear() {
    localStorage.removeItem("sessionToken");
    localStorage.removeItem("user");
  }
}
