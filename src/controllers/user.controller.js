export class UserController {
  constructor(sessionService, userService, exceptionService, userView) {
    this.sessionService = sessionService;
    this.userService = userService;
    this.exceptionService = exceptionService;
    this.userView = userView;
  }

  init() {
    document.addEventListener("DOMContentLoaded", () => {
      if (!this.sessionService.isLoggedIn()) {
        window.location.href = "/views/login.html";
        return;
      }

      const user = this.sessionService.getStoredUser();
      this.userView.renderGreeting(user);

      const logoutBtn = document.getElementById("logout-btn");
      if (logoutBtn) {
        logoutBtn.addEventListener("click", () => this.sessionService.logout());
      }
    });
  }
}
