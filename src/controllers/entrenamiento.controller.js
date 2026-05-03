export class EntrenamientoController {
  constructor(
    routineService,
    routineHasExerciseService,
    sessionService,
    trainingSessionService,
    exceptionService,
    routineView,
  ) {
    this.routineService = routineService;
    this.routineHasExerciseService = routineHasExerciseService;
    this.sessionService = sessionService;
    this.trainingSessionService = trainingSessionService;
    this.exceptionService = exceptionService;
    this.routineView = routineView;
    this.routines = [];
    this.currentRoutineId = null;
  }

  init() {
    document.addEventListener("DOMContentLoaded", () => {
      this.routineView.bindBackButton(() => {
        window.location.href = "/templates/menu.html";
      });
      this.routineView.bindRoutineSelect((id) => {
        if (id) {
          this.loadExercises(id);
        }
      });
      this.routineView.bindCompleteButton(() => this.handleComplete());
      this.loadAll();
    });
  }

  loadAll() {
    const user = this.sessionService.getCurrentUser();
    const defaultRoutineId = user?.defaultRoutineId ?? null;

    this.routineService
      .get({})
      .then((routines) => {
        this.routines = routines;
        this.routineView.renderRoutineDropdown(routines, defaultRoutineId);
        const targetId = defaultRoutineId ?? routines[0]?.id ?? null;
        if (targetId) {
          this.loadExercises(targetId);
        }
      })
      .catch((err) => this.exceptionService.handle(err));
  }

  loadExercises(routineId) {
    this.currentRoutineId = routineId;
    const routine = this.routines.find((r) => r.id === routineId);
    this.routineHasExerciseService
      .getByRoutineId(routineId)
      .then((exercises) => {
        this.routineView.renderRoutine(routine, exercises);
      })
      .catch((err) => this.exceptionService.handle(err));
  }

  handleComplete() {
    if (!this.currentRoutineId) {
      return;
    }
    const user = this.sessionService.getCurrentUser();
    if (!user) {
      return;
    }
    this.trainingSessionService
      .create({ userId: user.id, routineId: this.currentRoutineId })
      .then(() => this.routineView.renderSuccess("¡Rutina completada!"))
      .catch((err) => this.exceptionService.handle(err));
  }
}
