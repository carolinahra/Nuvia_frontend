export class MealLogService {
  constructor(httpService, sessionService) {
    this.httpService = httpService;
    this.sessionService = sessionService;
  }

  /**
   * @param {{ userId?: number }} getMealLogConfig
   * @returns {Promise<object[]>}
   */
  get(getMealLogConfig) {
    return this.httpService.get("user-meal-logs", getMealLogConfig);
  }

  /**
   * @param {number} id
   * @returns {Promise<object>}
   */
  getById(id) {
    return this.httpService.get("user-meal-logs", { id });
  }

  /**
   * @param {{ userId: number, dishId: number, quantity?: number, createdAt?: string }} createMealLogConfig
   * @returns {Promise<object>}
   */
  create(createMealLogConfig) {
    return this.httpService.post("user-meal-logs", createMealLogConfig);
  }

  /**
   * @param {{ id: number, userId?: number, dishId?: number, quantity?: number }} updateMealLogConfig
   * @returns {Promise<object>}
   */
  update(updateMealLogConfig) {
    return this.httpService.put("user-meal-logs", updateMealLogConfig);
  }

  /**
   * @param {{ id: number }} deleteMealLogConfig
   * @returns {Promise<boolean>}
   */
  delete(deleteMealLogConfig) {
    return this.httpService.delete("user-meal-logs", deleteMealLogConfig);
  }
}
