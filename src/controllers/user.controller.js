export class UserController {
  constructor(sessionService, exceptionService, userView) {
    this.sessionService = sessionService;
    this.exceptionService = exceptionService;
    this.userView = userView;
  }

  init() {
    const user = this.sessionService.getCurrentUser();
    this.userView.renderGreeting(user);
    this.userView.bindLogout(() => this.sessionService.logout());
    this.userView.bindNavigation((section) => this.navigateTo(section));
  }

  navigateTo(section) {
    window.location.href = `/templates/${section}.html`;
  }
}
