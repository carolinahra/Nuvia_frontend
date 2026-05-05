export class AlimentacionController {
  constructor(dietService, mealLogService, sessionService, exceptionService, alimentacionView) {
    this.dietService = dietService;
    this.mealLogService = mealLogService;
    this.sessionService = sessionService;
    this.exceptionService = exceptionService;
    this.alimentacionView = alimentacionView;
    this.grouped = {};
    this.completedDishIds = [];
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.alimentacionView.bindMealSelects((mealType, dishId) => {
        this.handleMealSelect(mealType, dishId);
      });
      this.alimentacionView.bindCompleteButtons((dishId, btn) => {
        this.handleComplete(dishId, btn);
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

    this.dietService
      .getDishesByDiet(dietId)
      .then((grouped) => {
        this.grouped = grouped;
        return this.mealLogService.get({ userId: user.id, date: today }).catch(() => []);
      })
      .then((logs) => {
        this.completedDishIds = logs.map((log) => log.dishId);
        this.alimentacionView.renderMealSections(this.grouped, this.completedDishIds);

        for (const [mealType, dishes] of Object.entries(this.grouped)) {
          const completedDish = dishes.find((d) => this.completedDishIds.includes(d.id));
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
    this.alimentacionView.renderDishCard(mealType, dish, this.completedDishIds.includes(dishId));
  }

  handleComplete(dishId, btn) {
    this.mealLogService
      .create({ dishId })
      .then(() => {
        this.completedDishIds.push(dishId);
        this.alimentacionView.markCompleted(btn);
        this.alimentacionView.renderSuccess('¡Plato completado!');
      })
      .catch((err) => this.exceptionService.handle(err));
  }
}
