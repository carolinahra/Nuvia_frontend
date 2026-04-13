export class RegisterView {
  constructor(exceptionView) {
    this.exceptionView = exceptionView;
  }

  bindForm(handler) {
    const form = document.getElementById("registroForm");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      handler({
        name: document.getElementById("nombre").value.trim(),
        username: document.getElementById("username").value.trim(),
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value.trim(),
        confirmPassword: document.getElementById("confirmPassword").value.trim(),
        sex: document.querySelector('input[name="sex"]:checked')?.value,
        heightCm: Number(document.getElementById("altura").value),
        currentWeightKg: Number(document.getElementById("pesoActual").value),
        targetWeightKg: Number(document.getElementById("pesoObjetivo").value),
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
