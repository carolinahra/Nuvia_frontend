export class LoginController {
  #emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor(sessionService, exceptionService, exceptionView) {
    this.sessionService = sessionService;
    this.exceptionService = exceptionService;
    this.exceptionView = exceptionView;
  }

  init() {
    document.addEventListener("DOMContentLoaded", () => {
      const form = document.getElementById("loginForm");
      form.addEventListener("submit", (e) => this.handleSubmit(e));
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const email = document.getElementById("login-email-field").value.trim();
    const password = document.getElementById("login-password-field").value.trim();

    if (!this.#emailRegex.test(email)) {
      this.exceptionView.renderErrorMessage({ httpCode: 0, errorMessage: "Por favor, introduce un correo electrónico válido." });
      return;
    }
    if (password.length < 6) {
      this.exceptionView.renderErrorMessage({ httpCode: 0, errorMessage: "La contraseña debe tener al menos 6 caracteres." });
      return;
    }

    this.sessionService
      .login({ email, password })
      .then(() => {
        window.location.href = "/views/home.html";
      })
      .catch((error) => this.exceptionService.handle(error));
  }
}
