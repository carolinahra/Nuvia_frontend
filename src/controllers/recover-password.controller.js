export class RecoverPasswordController {
  #emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor(passwordService, exceptionService, recoverPasswordView) {
    this.passwordService = passwordService;
    this.exceptionService = exceptionService;
    this.recoverPasswordView = recoverPasswordView;
  }

  initForgot() {
    document.addEventListener("DOMContentLoaded", () => {
      this.recoverPasswordView.bindForgotForm((data) => this.handleForgot(data));
    });
  }

  initReset() {
    document.addEventListener("DOMContentLoaded", () => {
      this.recoverPasswordView.bindResetForm((data) => this.handleReset(data));
    });
  }

  handleForgot({ email }) {
    if (!this.#emailRegex.test(email)) {
      this.recoverPasswordView.renderError("Por favor, introduce un correo electrónico válido.");
      return;
    }

    return this.passwordService
      .forgot({ email })
      .then(() => {
        this.recoverPasswordView.renderSuccess(
          "Si el correo existe, recibirás un enlace para recuperar tu contraseña."
        );
      })
      .catch((error) => {
        this.exceptionService.handle(error);
      });
  }

  handleReset({ password, repeatPassword }) {
    if (password.length < 6) {
      this.recoverPasswordView.renderError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== repeatPassword) {
      this.recoverPasswordView.renderError("Las contraseñas no coinciden.");
      return;
    }

    const token = new URLSearchParams(window.location.search).get("token");

    if (!token) {
      this.recoverPasswordView.renderError("Enlace de recuperación no válido.");
      return;
    }

    return this.passwordService
      .reset({ token, password })
      .then(() => {
        this.recoverPasswordView.renderSuccess(
          "Contraseña actualizada correctamente. Ya puedes iniciar sesión."
        );
      })
      .catch((error) => {
        this.exceptionService.handle(error);
      });
  }
}
