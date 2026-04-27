export class WeightLogService {
  constructor(httpService, sessionService) {
    this.httpService = httpService;
    this.sessionService = sessionService;
  }

  /**
   * @param {{ userId?: number }} getWeightLogConfig
   * @returns {Promise<object[]>}
   */
  get(getWeightLogConfig) {
    return this.httpService.get("user-weight-logs", getWeightLogConfig);
  }

  /**
   * @param {number} id
   * @returns {Promise<object>}
   */
  getById(id) {
    return this.httpService.get("user-weight-logs", { id });
  }

  /**
   * @param {{ user_weight_log_user: number, user_weight_log_weight_kg: number, user_weight_log_created_at?: string }} createWeightLogConfig
   * @returns {Promise<object>}
   */
  create(createWeightLogConfig) {
    return this.httpService.post("user-weight-logs", createWeightLogConfig);
  }

  /**
   * @param {{ id: number, user_weight_log_weight_kg?: number }} updateWeightLogConfig
   * @returns {Promise<object>}
   */
  update(updateWeightLogConfig) {
    return this.httpService.put("user-weight-logs", updateWeightLogConfig);
  }

  /**
   * @param {{ id: number }} deleteWeightLogConfig
   * @returns {Promise<boolean>}
   */
  delete(deleteWeightLogConfig) {
    return this.httpService.delete("user-weight-logs", deleteWeightLogConfig);
  }
}
