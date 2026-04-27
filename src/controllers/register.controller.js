export class RegisterController {
  constructor(userService, registerView) {
    this.userService = userService;
    this.registerView = registerView;
  }

  init() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        this.registerView.bindForm((data) => this.handleSubmit(data));
      });
    } else {
      this.registerView.bindForm((data) => this.handleSubmit(data));
    }
  }

  handleSubmit({ name, username, email, password, confirmPassword, sex, heightCm, currentWeightKg, targetWeightKg }) {
    if (password !== confirmPassword) {
      this.registerView.renderError("Las contraseñas no coinciden.");
      return;
    }

    return this.userService
      .create({ name, username, email, password, sex, heightCm, currentWeightKg, targetWeightKg })
      .then(() => {
        window.location.href = "/templates/login.html";
      })
      .catch((error) =>
        this.registerView.renderError(error.errorMessage ?? error.message)
      );
  }
}
