export class WeightLogController {
  constructor(userWeightLogService, exceptionService, exceptionView, weightLogView) {
    this.userWeightLogService = userWeightLogService;
    this.exceptionService = exceptionService;
    this.exceptionView = exceptionView;
    this.weightLogView = weightLogView;
  }

  init() {
    document.addEventListener("DOMContentLoaded", () => {
      this.weightLogView.bindForm((data) => this.handleSubmit(data));
    });
  }

  handleSubmit({ weightKg }) {
    if (!weightKg || weightKg <= 0) {
      this.exceptionService.handle({ httpCode: 0, errorMessage: "Introduce un peso válido mayor que 0." });
      return;
    }

    return this.userWeightLogService
      .create({ weightKg })
      .then(() => {
        this.exceptionView.renderSuccessMessage("Peso registrado correctamente.");
        this.weightLogView.resetForm();
      })
      .catch((error) => {
        this.exceptionService.handle(error);
      });
  }
}
