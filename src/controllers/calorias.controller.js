export class CaloriasController {
  constructor(tmbService, sessionService, exceptionService, caloriasView) {
    this.tmbService = tmbService;
    this.sessionService = sessionService;
    this.exceptionService = exceptionService;
    this.caloriasView = caloriasView;
  }

  init() {
    const setup = () => {
      const user = this.sessionService.getCurrentUser();
      if (!user) {
        window.location.href = "/templates/login.html";
        return;
      }

      this.caloriasView.renderForm(user.activityLevel || "");
      this.caloriasView.bindCalculate((activityLevel) => this.handleCalculate(activityLevel));
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", setup);
    } else {
      setup();
    }
  }

  handleCalculate(activityLevel) {
    if (!activityLevel) {
      this.caloriasView.renderError("Selecciona un nivel de actividad.");
      return;
    }

    this.tmbService
      .calculate({ activityLevel })
      .then((result) => {
        this.caloriasView.renderResults(result);
      })
      .catch((err) => {
        this.caloriasView.renderError(
          err.errorMessage ?? err.message ?? "Error al calcular. Asegúrate de tener completos tus datos de perfil (peso, altura, fecha de nacimiento y sexo)."
        );
      });
  }
}
