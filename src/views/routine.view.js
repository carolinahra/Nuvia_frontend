export class RoutineView {
  renderRoutineDropdown(routines, selectedId) {
    const select = document.getElementById("tipoEntrenamiento");
    if (!select) {
      return;
    }
    select.innerHTML = '<option value="">Selecciona una opción</option>';
    routines.forEach((routine) => {
      const option = document.createElement("option");
      option.value = routine.id;
      option.textContent = routine.name;
      if (routine.id === selectedId) option.selected = true;
      select.appendChild(option);
    });
  }

  renderRoutine(routine, exercises) {
    this.renderRoutineInfo(routine);
    this.renderExercises(exercises);
  }

  renderRoutineInfo(routine) {
    const titleEl = document.querySelector(
      "#trainingRoutineInfo .entrenamiento-rutina-title",
    );
    const durationEl = document.querySelector(
      "#trainingRoutineInfo .entrenamiento-duration",
    );
    if (titleEl) titleEl.textContent = routine.name;
    if (durationEl) durationEl.textContent = `${routine.durationMinutes} min`;
  }

  renderExercises(exercises) {
    const listEl = document.getElementById("trainingExercisesList");
    if (!listEl) return;
    listEl.innerHTML = "";
    const sorted = [...exercises].sort(
      (a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0),
    );
    sorted.forEach((ex) => listEl.appendChild(this.buildExerciseCard(ex)));
  }

  buildExerciseCard(ex) {
    const article = document.createElement("article");
    article.className = "entrenamiento-exercise";

    const seriesText =
      ex.sets && ex.reps
        ? `${ex.sets}x${ex.reps}`
        : ex.sets
          ? `${ex.sets} series`
          : "";
    const restText = ex.restSeconds ? `Descanso: ${ex.restSeconds}s` : "";

    article.innerHTML = `
      <div class="entrenamiento-exercise-info">
        <h3 class="entrenamiento-exercise-name">${ex.name}</h3>
        ${restText ? `<p class="entrenamiento-exercise-rest">${restText}</p>` : ""}
      </div>
      ${seriesText ? `<span class="entrenamiento-exercise-series">${seriesText}</span>` : ""}
    `;
    return article;
  }

  bindRoutineSelect(handler) {
    const select = document.getElementById("tipoEntrenamiento");
    if (select) {
      select.addEventListener("change", (e) => handler(Number(e.target.value)));
    }
  }

  bindBackButton(handler) {
    const btn = document.querySelector(".entrenamiento-back-btn");
    if (btn) {
      btn.addEventListener("click", handler);
    }
  }
}
