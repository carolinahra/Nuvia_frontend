export class RegisterController {
  #emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor(userService, weightLogService, exceptionService, registerView) {
    this.userService = userService;
    this.weightLogService = weightLogService;
    this.exceptionService = exceptionService;
    this.registerView = registerView;
  }

  init() {
    document.addEventListener("DOMContentLoaded", () => {
      this.registerView.bindForm((formData) => this.handleSubmit(formData));
    });
  }

  handleSubmit({ name, email, password, confirmPassword, currentWeight, heightCm, targetWeight }) {
    // --- Validaciones ---

    if (!name || name.length < 2) {
      this.registerView.renderError("El nombre debe tener al menos 2 caracteres.");
      return;
    }

    if (!this.#emailRegex.test(email)) {
      this.registerView.renderError("Por favor, introduce un correo electrónico válido.");
      return;
    }

    if (password.length < 6) {
      this.registerView.renderError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      this.registerView.renderError("Las contraseñas no coinciden.");
      return;
    }

    const parsedHeight = Number(heightCm);
    if (!heightCm || isNaN(parsedHeight) || parsedHeight <= 0) {
      this.registerView.renderError("Introduce una altura válida en centímetros.");
      return;
    }

    const parsedCurrentWeight = Number(currentWeight);
    if (!currentWeight || isNaN(parsedCurrentWeight) || parsedCurrentWeight <= 0) {
      this.registerView.renderError("Introduce un peso actual válido en kilogramos.");
      return;
    }

    const parsedTargetWeight = Number(targetWeight);
    if (!targetWeight || isNaN(parsedTargetWeight) || parsedTargetWeight <= 0) {
      this.registerView.renderError("Introduce un peso objetivo válido en kilogramos.");
      return;
    }

    // --- Paso 1: Crear usuario ---
    this.userService
      .create({
        name,
        email,
        password,
        heightCm: parsedHeight,
        target_weight_kg: parsedTargetWeight,
      })
      .then((user) => {
        // --- Paso 2: Registrar peso actual como primer WeightLog ---
        return this.weightLogService
          .create({
            user_weight_log_user: user.id,
            user_weight_log_weight_kg: parsedCurrentWeight,
          })
          .then(() => user);
      })
      .then(() => {
        this.registerView.renderSuccess("¡Cuenta creada correctamente! Redirigiendo al login...");
        setTimeout(() => {
          window.location.href = "/views/login.html";
        }, 2000);
      })
      .catch((error) => {
        this.registerView.renderError(error.errorMessage ?? error.message);
      });
  }
}
