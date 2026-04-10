class LoginController {
  #emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor(loginService, loginView) {
    this.loginService = loginService;
    this.loginView = loginView;
  }

  init() {
    document.addEventListener("DOMContentLoaded", () => {
      this.loginView.bindForm((credentials) => this.handleSubmit(credentials));
    });
  }

  handleSubmit({ email, password }) {
    if (!this.#emailRegex.test(email)) {
      this.loginView.renderError(
        "Por favor, introduce un correo electrónico válido."
      );
      return;
    }

    if (password.length < 6) {
      this.loginView.renderError(
        "La contraseña debe tener al menos 6 caracteres."
      );
      return;
    }

    return this.loginService
      .login({ email, password })
      .then(() => {
        window.location.href = "/views/home.html";
      })
      .catch((error) =>
        this.loginView.renderError(error.errorMessage ?? error.message)
      );
  }
}

module.exports = { LoginController };