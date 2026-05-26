export class RecoverPasswordView {
  constructor(exceptionView) {
    this.exceptionView = exceptionView;
  }

  bindForgotForm(handler) {
    const form = document.getElementById("forgotPasswordForm");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      handler({ email: document.getElementById("forgot-email").value.trim() });
    });
  }

  bindResetForm(handler) {
    const form = document.getElementById("resetPasswordForm");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      handler({
        password: document.getElementById("reset-password").value,
        repeatPassword: document.getElementById("reset-repeat-password").value,
      });
    });
  }

  renderError(message) {
    this.exceptionView.renderErrorMessage({ httpCode: 0, errorMessage: message });
  }

  renderSuccess(message) {
    this.exceptionView.renderSuccessMessage(message);
  }
}
