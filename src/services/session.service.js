export class SessionService {
  store(token, user) {
    localStorage.setItem("sessionToken", token);
    localStorage.setItem("user", JSON.stringify(user));
  }

  /**
   * @returns {{ id: number, name: string, username: string, email: string, isAdmin: boolean } | null}
   */
  getStoredUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }

  clear() {
    localStorage.removeItem("sessionToken");
    localStorage.removeItem("user");
  }
}
