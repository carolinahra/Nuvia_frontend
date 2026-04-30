import { UserWeightLog } from "../models/user-weight-log.js";

export class UserWeightLogService {
  constructor(httpService, sessionService) {
    this.httpService = httpService;
    this.sessionService = sessionService;
  }

  /**
   * @param {{ userId?: number }} getUserWeightLogConfig
   * @returns {Promise<UserWeightLog[]>}
   */
  get(getUserWeightLogConfig) {
    return this.httpService
      .get("user-weight-logs", getUserWeightLogConfig)
      .then((data) => data.map((e) => new UserWeightLog(e)));
  }

  /**
   * @param {number} id
   * @returns {Promise<UserWeightLog>}
   */
  getById(id) {
    return this.httpService
      .get("user-weight-logs", { id })
      .then((data) => new UserWeightLog(data[0]));
  }

  /**
   * @param {{ userId: number, weightKg: number, createdAt?: string }} createUserWeightLogConfig
   * @returns {Promise<UserWeightLog>}
   */
  create(createUserWeightLogConfig) {
    return this.httpService
      .post("user-weight-logs", createUserWeightLogConfig)
      .then((data) => new UserWeightLog(data));
  }

  /**
   * @param {{ id: number, weightKg?: number }} updateUserWeightLogConfig
   * @returns {Promise<UserWeightLog>}
   */
  update(updateUserWeightLogConfig) {
    return this.httpService
      .put("user-weight-logs", updateUserWeightLogConfig)
      .then((data) => new UserWeightLog(data));
  }

  /**
   * @param {{ id: number }} deleteUserWeightLogConfig
   * @returns {Promise<boolean>}
   */
  delete(deleteUserWeightLogConfig) {
    return this.httpService.delete("user-weight-logs", deleteUserWeightLogConfig);
  }
}
