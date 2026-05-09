export class CaloriasView {
  constructor(exceptionView) {
    this.exceptionView = exceptionView;
  }

  /**
   * Renders the activity level selector and calculate button inside #ingestaFormContainer.
   */
  renderForm(currentActivityLevel) {
    const container = document.getElementById("ingestaFormContainer");
    if (!container) return;

    const levels = [
      { value: "sedentary", label: "Sedentario (poco o ningún ejercicio)" },
      { value: "light", label: "Ligero (1-3 días/semana)" },
      { value: "moderate", label: "Moderado (3-5 días/semana)" },
      { value: "active", label: "Activo (6-7 días/semana)" },
      { value: "very_active", label: "Muy activo (2 veces/día)" },
    ];

    const options = levels
      .map(
        (l) =>
          `<option value="${l.value}" ${l.value === currentActivityLevel ? "selected" : ""}>${l.label}</option>`
      )
      .join("");

    container.innerHTML = `
      <div class="editar-perfil-group">
        <label for="activityLevelSelect">Nivel de actividad</label>
        <select id="activityLevelSelect">
          <option value="">Selecciona tu nivel</option>
          ${options}
        </select>
      </div>

      <button id="calcularTmbBtn" class="editar-perfil-save-btn" type="button">
        Calcular ingesta calórica
      </button>

      <div id="tmbResultContainer"></div>
    `;
  }

  /**
   * Binds the calculate button click.
   */
  bindCalculate(handler) {
    const btn = document.getElementById("calcularTmbBtn");
    if (!btn) return;

    btn.addEventListener("click", () => {
      const activityLevel = document.getElementById("activityLevelSelect").value;
      handler(activityLevel);
    });
  }

  /**
   * Renders the TMB/GET/IMC results.
   */
  renderResults({ tmb, get, imc, ingestaDiariaKcal }) {
    const container = document.getElementById("tmbResultContainer");
    if (!container) return;

    const imcCategory = this.getImcCategory(imc);

    container.innerHTML = `
      <div class="ingesta-results">
        <div class="ingesta-result-item">
          <span class="ingesta-result-label">TMB</span>
          <span class="ingesta-result-value">${tmb} kcal</span>
          <span class="ingesta-result-desc">Tasa Metabólica Basal</span>
        </div>

        <div class="ingesta-result-item highlight">
          <span class="ingesta-result-label">Ingesta diaria</span>
          <span class="ingesta-result-value">${ingestaDiariaKcal} kcal</span>
          <span class="ingesta-result-desc">Gasto Energético Total</span>
        </div>

        <div class="ingesta-result-item">
          <span class="ingesta-result-label">IMC</span>
          <span class="ingesta-result-value">${imc}</span>
          <span class="ingesta-result-desc">${imcCategory}</span>
        </div>
      </div>
    `;
  }

  getImcCategory(imc) {
    if (imc < 18.5) return "Bajo peso";
    if (imc < 25) return "Peso normal";
    if (imc < 30) return "Sobrepeso";
    return "Obesidad";
  }

  renderError(message) {
    this.exceptionView.renderErrorMessage({ httpCode: 0, errorMessage: message });
  }

  renderSuccess(message) {
    this.exceptionView.renderSuccessMessage(message);
  }
}
