import { TrainingSession } from "../models/training-session.js";

export class TrainingSessionService {
  constructor(httpService) {
    this.httpService = httpService;
  }

  /**
   * @param {{ userId?: number, routineId?: number }} getTrainingSessionConfig
   * @returns {Promise<TrainingSession[]>}
   */
  get(getTrainingSessionConfig) {
    return this.httpService
      .get("training-sessions", getTrainingSessionConfig)
      .then((data) => data.map((e) => new TrainingSession(e)));
  }

  /**
   * @param {number} id
   * @returns {Promise<TrainingSession>}
   */
  getById(id) {
    return this.httpService
      .get("training-sessions", { id })
      .then((data) => new TrainingSession(data[0]));
  }

  /**
   * @param {{ userId: number, routineId: number, completedAt?: string }} createTrainingSessionConfig
   * @returns {Promise<TrainingSession>}
   */
  create(createTrainingSessionConfig) {
    return this.httpService
      .post("training-sessions", createTrainingSessionConfig)
      .then((data) => new TrainingSession(data));
  }

  /**
   * @param {{ id: number }} deleteTrainingSessionConfig
   * @returns {Promise<boolean>}
   */
  delete(deleteTrainingSessionConfig) {
    return this.httpService.delete("training-sessions", deleteTrainingSessionConfig);
  }
}
