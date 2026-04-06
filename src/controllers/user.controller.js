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
      this.userView.bindLogout(() => this.sessionService.logout());
      this.userView.bindNavigation((section) => this.navigateTo(section));
    });
  }

  navigateTo(section) {
    window.location.href = `/views/${section}.html`;
  }
}
