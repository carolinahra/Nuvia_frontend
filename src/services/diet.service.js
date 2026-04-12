export class DietService {
  constructor(httpService, sessionService) {
    this.httpService = httpService;
    this.sessionService = sessionService;
  }

  /**
   * @param {{ id?: number, name?: string, goal?: string, dietType?: string }} getDietConfig
   * @returns {Promise<object[]>}
   */
  get(getDietConfig) {
    return this.httpService.get("diets", getDietConfig);
  }

  /**
   * @param {number} id
   * @returns {Promise<object>}
   */
  getById(id) {
    return this.httpService.get("diets", { id });
  }

  /**
   * @param {{ diet_name: string, diet_description: string, diet_total_daily_calories: number, diet_goal: string, diet_type: string }} createDietConfig
   * @returns {Promise<object>}
   */
  create(createDietConfig) {
    return this.httpService.post("diets", createDietConfig);
  }

  /**
   * @param {{ id: number, diet_name?: string, diet_description?: string, diet_total_daily_calories?: number, diet_goal?: string, diet_type?: string }} updateDietConfig
   * @returns {Promise<object>}
   */
  update(updateDietConfig) {
    return this.httpService.put("diets", updateDietConfig);
  }

  /**
   * @param {{ id: number }} deleteDietConfig
   * @returns {Promise<boolean>}
   */
  delete(deleteDietConfig) {
    return this.httpService.delete("diets", deleteDietConfig);
  }
}
