export class MealLogService {
  constructor(httpService, sessionService) {
    this.httpService = httpService;
    this.sessionService = sessionService;
  }

  /**
   * @param {{ from?: string, to?: string, date?: string }} getMealLogConfig
   * @returns {Promise<object[]>}
   */
  get(getMealLogConfig) {
    return this.httpService.get("user-meal-log", getMealLogConfig);
  }

  /**
   * @param {number} id
   * @returns {Promise<object>}
   */
  getById(id) {
    return this.httpService.get("user-meal-log", { id });
  }

  /**
   * @param {{ dishId: number, quantity?: number }} createMealLogConfig
   * @returns {Promise<object>}
   */
  create(createMealLogConfig) {
    return this.httpService.post("user-meal-log", createMealLogConfig);
  }

  /**
   * @param {{ id: number, dishId?: number, quantity?: number }} updateMealLogConfig
   * @returns {Promise<object>}
   */
  update(updateMealLogConfig) {
    return this.httpService.put("user-meal-log", updateMealLogConfig);
  }

  /**
   * @param {{ id: number }} deleteMealLogConfig
   * @returns {Promise<boolean>}
   */
  delete(deleteMealLogConfig) {
    return this.httpService.delete("user-meal-log", deleteMealLogConfig);
  }
}
