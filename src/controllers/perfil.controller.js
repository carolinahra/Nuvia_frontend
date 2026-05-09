export class PerfilController {
  constructor(userService, userWeightLogService, sessionService, exceptionService, perfilView) {
    this.userService = userService;
    this.userWeightLogService = userWeightLogService;
    this.sessionService = sessionService;
    this.exceptionService = exceptionService;
    this.perfilView = perfilView;
  }

  init() {
    const setup = () => {
      const user = this.sessionService.getCurrentUser();
      if (!user) {
        window.location.href = "/templates/login.html";
        return;
      }

      this.perfilView.prefillForm(user);
      this.perfilView.bindForm((data) => this.handleSubmit(data));
      // Obtener el último peso registrado para pre-rellenar el campo de peso actual
      this.userWeightLogService
        .get({})
        .then((logs) => {
          if (logs.length > 0) {
            logs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            const ultimoPeso = logs[0].weightKg;
            this.perfilView.prefillWeight(ultimoPeso);
          }
        })
        .catch(() => {}); // Si falla, el campo queda vacío
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", setup);
    } else {
      setup();
    }
  }

  handleSubmit(data) {
    const user = this.sessionService.getCurrentUser();
    if (!user) return;

    // Determinar goal a partir de peso actual/objetivo si ambos están presentes
    let goal = data.goal;
    if (data.currentWeightKg && data.targetWeightKg && !goal) {
      if (data.currentWeightKg > data.targetWeightKg) {
        goal = "lose";
      } else if (data.currentWeightKg < data.targetWeightKg) {
        goal = "gain";
      } else {
        goal = "maintain";
      }
    }

    const updateData = {
      id: user.id,
    };

    if (data.name) updateData.name = data.name;
    if (data.height_cm) updateData.height_cm = data.height_cm;
    if (data.birth_date) updateData.birth_date = data.birth_date;
    if (data.sex) updateData.sex = data.sex;
    if (data.activity_level) updateData.activity_level = data.activity_level;
    if (goal) updateData.goal = goal;

    return this.userService
      .update(updateData)
      .then((updatedUser) => {
        // Actualizar los datos almacenados en sesión
        const stored = JSON.parse(localStorage.getItem("user") || "{}");
        const merged = { ...stored, ...updatedUser };
        localStorage.setItem("user", JSON.stringify(merged));

        // Si hay peso actual, registrar nuevo peso
        if (data.currentWeightKg) {
          return this.userWeightLogService
            .create({ weightKg: data.currentWeightKg })
            .then(() => updatedUser)
            .catch(() => updatedUser); // no bloquear si falla el log
        }
        return updatedUser;
      })
      .then(() => {
        this.perfilView.renderSuccess("Perfil actualizado correctamente.");
      })
      .catch((err) => {
        this.perfilView.renderError(err.errorMessage ?? err.message ?? "Error al guardar el perfil.");
      });
  }
}
