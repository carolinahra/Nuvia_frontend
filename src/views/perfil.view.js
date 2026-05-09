export class PerfilView {
  constructor(exceptionView) {
    this.exceptionView = exceptionView;
  }

  /**
   * Pre-rellena el formulario con los datos actuales del usuario.
   */
  prefillForm(user) {
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el && val != null) el.value = val;
    };

    setVal("nombreCompleto", user.name);
    setVal("altura", user.heightCm);
    setVal("fechaNacimiento", user.birthdate);
    setVal("nivelActividad", user.activityLevel);
    setVal("objetivo", user.goal);

    // Marcar el radio de sexo si el usuario lo tiene guardado
    if (user.sex) {
      const radio = document.querySelector(`input[name="sex"][value="${user.sex}"]`);
      if (radio) radio.checked = true;
    }
  }

  /**
   * Pre-rellena el campo de peso actual con el último peso registrado.
   */
  prefillWeight(weightKg) {
    const el = document.getElementById("pesoActual");
    if (el && weightKg != null) el.value = weightKg;
  }

  /**
   * Enlaza el evento submit del formulario de editar perfil.
   */
  bindForm(handler) {
    const form = document.getElementById("editarPerfilForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      handler({
        name: document.getElementById("nombreCompleto").value.trim(),
        height_cm: Number(document.getElementById("altura").value) || null,
        birth_date: document.getElementById("fechaNacimiento").value || null,
        sex: document.querySelector('input[name="sex"]:checked')?.value || null,
        currentWeightKg: Number(document.getElementById("pesoActual").value) || null,
        targetWeightKg: Number(document.getElementById("pesoObjetivo").value) || null,
        activity_level: document.getElementById("nivelActividad").value || null,
        goal: document.getElementById("objetivo").value || null,
      });
    });
  }

  renderError(message) {
    this.exceptionView.renderErrorMessage({ httpCode: 0, errorMessage: message });
  }

  renderSuccess(message) {
    this.exceptionView.renderSuccessMessage(message);
  }
}