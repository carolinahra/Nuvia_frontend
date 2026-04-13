export class UserController {
  constructor(userService, exceptionService, userView) {
    this.userService = userService;
    this.exceptionService = exceptionService;
    this.userView = userView;
  }

  init() {
    document.addEventListener("DOMContentLoaded", () => {
      const user = this.userService.getCurrent();
      this.userView.renderGreeting(user);
      this.userView.bindLogout(() => this.userService.logout());
      this.userView.bindNavigation((section) => this.navigateTo(section));
    });
  }

  navigateTo(section) {
    window.location.href = `/templates/${section}.html`;
  }
}
