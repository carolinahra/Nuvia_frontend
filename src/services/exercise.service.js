import { Exercise } from "../models/exercise.js";

export class ExerciseService {
  constructor(httpService, sessionService) {
    this.httpService = httpService;
    this.sessionService = sessionService;
  }

  /**
   * @param {{ id?: number, name?: string, intensity?: string }} getExerciseConfig
   * @returns {Promise<Exercise[]>}
   */
  get(getExerciseConfig) {
    return this.httpService
      .get("exercises", getExerciseConfig)
      .then((data) => data.map((e) => new Exercise(e)));
  }

  /**
   * @param {number} id
   * @returns {Promise<Exercise>}
   */
  getById(id) {
    return this.httpService
      .get("exercises", { id })
      .then((data) => new Exercise(data[0]));
  }

  /**
   * @param {{ name: string, description?: string, intensity?: string }} createExerciseConfig
   * @returns {Promise<Exercise>}
   */
  create(createExerciseConfig) {
    return this.httpService
      .post("exercises", createExerciseConfig)
      .then((data) => new Exercise(data));
  }

  /**
   * @param {{ id: number, name?: string, description?: string, intensity?: string }} updateExerciseConfig
   * @returns {Promise<Exercise>}
   */
  update(updateExerciseConfig) {
    return this.httpService
      .put("exercises", updateExerciseConfig)
      .then((data) => new Exercise(data));
  }

  /**
   * @param {{ id?: number, name?: string }} deleteExerciseConfig
   * @returns {Promise<boolean>}
   */
  delete(deleteExerciseConfig) {
    return this.httpService.delete("exercises", deleteExerciseConfig);
  }
}
