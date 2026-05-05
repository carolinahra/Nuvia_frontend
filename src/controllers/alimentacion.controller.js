export class AlimentacionController {
  constructor(dietService, mealLogService, sessionService, exceptionService, alimentacionView) {
    this.dietService = dietService;
    this.mealLogService = mealLogService;
    this.sessionService = sessionService;
    this.exceptionService = exceptionService;
    this.alimentacionView = alimentacionView;
    this.grouped = {};
    this.completedDishIds = new Set();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.alimentacionView.bindMealSelects((mealType, dishId) => {
        this.handleMealSelect(mealType, dishId);
      });
      this.alimentacionView.bindCompleteButtons((dishId, mealType, btn) => {
        this.handleComplete(dishId, mealType, btn);
      });
      this.load();
    });
  }

  load() {
    const user = this.sessionService.getCurrentUser();
    if (!user) return;

    const dietId = user.defaultDietId;
    if (!dietId) {
      this.alimentacionView.renderError('No tienes un plan de alimentación asignado.');
      return;
    }

    const today = new Date().toISOString().slice(0, 10);

    Promise.all([
      this.dietService.getDishesByDiet(dietId),
      this.mealLogService.get({ userId: user.id, date: today }),
    ])
      .then(([grouped, logs]) => {
        this.grouped = grouped;
        this.completedDishIds = new Set(logs.map((log) => log.dishId));
        this.alimentacionView.renderMealSections(grouped, this.completedDishIds);

        for (const [mealType, dishes] of Object.entries(grouped)) {
          const completedDish = dishes.find((d) => this.completedDishIds.has(d.id));
          if (completedDish) {
            this.alimentacionView.preSelectDish(mealType, completedDish.id);
            this.alimentacionView.renderDishCard(mealType, completedDish, true);
          }
        }
      })
      .catch((err) => this.exceptionService.handle(err));
  }

  handleMealSelect(mealType, dishId) {
    if (!dishId) {
      this.alimentacionView.renderDishCard(mealType, null, false);
      return;
    }
    const dish = (this.grouped[mealType] ?? []).find((d) => d.id === dishId) ?? null;
    this.alimentacionView.renderDishCard(mealType, dish, this.completedDishIds.has(dishId));
  }

  handleComplete(dishId, mealType, btn) {
    this.mealLogService
      .create({ dishId })
      .then(() => {
        this.completedDishIds.add(dishId);
        this.alimentacionView.markCompleted(btn);
        this.alimentacionView.renderSuccess('¡Plato completado!');
      })
      .catch((err) => this.exceptionService.handle(err));
  }
}
