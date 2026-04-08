export class LoginView {
  constructor(exceptionView) {
    this.exceptionView = exceptionView;
  }

  bindForm(handler) {
    const form = document.getElementById("loginForm");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      handler({
        email: document.getElementById("login-email-field").value.trim(),
        password: document.getElementById("login-password-field").value.trim(),
      });
    });
  }

  renderError(message) {
    this.exceptionView.renderErrorMessage({ httpCode: 0, errorMessage: message });
  }
}
