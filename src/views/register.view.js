export class RegisterView {
  constructor(exceptionView) {
    this.exceptionView = exceptionView;
  }

  bindForm(handler) {
    const form = document.getElementById("registerForm");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      handler({
        name: document.getElementById("register-name-field").value.trim(),
        email: document.getElementById("register-email-field").value.trim(),
        password: document.getElementById("register-password-field").value.trim(),
        confirmPassword: document.getElementById("register-confirm-password-field").value.trim(),
        currentWeight: document.getElementById("register-current-weight-field").value.trim(),
        heightCm: document.getElementById("register-height-field").value.trim(),
        targetWeight: document.getElementById("register-target-weight-field").value.trim(),
      });
    });
  }

  renderError(message) {
    this.exceptionView.renderErrorMessage({ httpCode: 0, errorMessage: message });
  }

  renderSuccess(message) {
    const container = document.getElementById("register-success-message");
    if (container) {
      container.textContent = message;
      container.style.display = "block";
    }
  }
}
