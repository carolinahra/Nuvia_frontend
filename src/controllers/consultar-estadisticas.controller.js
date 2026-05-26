export class ConsultarEstadisticasController {
  constructor(userWeightLogService, trainingSessionService, mealLogService, dietService, sessionService, exceptionService, consultarEstadisticasView) {
    this.userWeightLogService = userWeightLogService;
    this.trainingSessionService = trainingSessionService;
    this.mealLogService = mealLogService;
    this.dietService = dietService;
    this.sessionService = sessionService;
    this.exceptionService = exceptionService;
    this.consultarEstadisticasView = consultarEstadisticasView;
  }

  init() {
    document.addEventListener("DOMContentLoaded", () => {
      this.loadLatestWeight();
      this.loadWeeklyTrainingSessions();
      this.loadWeeklyMealLogs();
    });
  }

  loadLatestWeight() {
    return this.userWeightLogService
      .get({})
      .then((logs) => {
        if (logs.length === 0) {
          this.consultarEstadisticasView.renderWeight(null);
          return;
        }

        const latest = logs.reduce((prev, curr) =>
          new Date(curr.createdAt) > new Date(prev.createdAt) ? curr : prev
        );

        this.consultarEstadisticasView.renderWeight(latest.weightKg);
      })
      .catch((error) => {
        this.exceptionService.handle(error);
      });
  }

  loadWeeklyTrainingSessions() {
    return this.trainingSessionService
      .get({})
      .then((sessions) => {
        this.consultarEstadisticasView.renderTrainingSessions(sessions);
      })
      .catch((error) => {
        this.exceptionService.handle(error);
      });
  }

  loadWeeklyMealLogs() {
    const user = this.sessionService.getCurrentUser();
    const dietId = user?.defaultDietId;

    if (!dietId) {
      return;
    }

    const monday = this.#getMonday(new Date());
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    const from = this.#formatDate(monday);
    const to = this.#formatDate(sunday);

    return Promise.all([
      this.mealLogService.get({ from, to }),
      this.dietService.getDishesByDiet(dietId),
    ])
      .then(([logs, dietPlan]) => {
        this.consultarEstadisticasView.renderMealLogs(logs, dietPlan);
      })
      .catch((error) => {
        this.exceptionService.handle(error);
      });
  }

  #getMonday(date) {
    const day = date.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    const monday = new Date(date);
    monday.setDate(date.getDate() + diff);
    monday.setHours(0, 0, 0, 0);
    return monday;
  }

  #formatDate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
}
