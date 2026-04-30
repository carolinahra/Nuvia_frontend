import { Routine } from "../models/routine.js";

export class RoutineService {
  constructor(httpService, sessionService) {
    this.httpService = httpService;
    this.sessionService = sessionService;
  }

  /**
   * @param {{ id?: number, name?: string }} getRoutineConfig
   * @returns {Promise<Routine[]>}
   */
  get(getRoutineConfig) {
    return this.httpService
      .get("routines", getRoutineConfig)
      .then((data) => data.map((r) => new Routine(r)));
  }

  /**
   * @param {number} id
   * @returns {Promise<Routine>}
   */
  getById(id) {
    return this.httpService
      .get("routines", { id })
      .then((data) => new Routine(data[0]));
  }

  /**
   * @param {{ name: string, description?: string, durationMinutes?: number }} createRoutineConfig
   * @returns {Promise<Routine>}
   */
  create(createRoutineConfig) {
    return this.httpService
      .post("routines", createRoutineConfig)
      .then((data) => new Routine(data));
  }

  /**
   * @param {{ id: number, name?: string, description?: string, durationMinutes?: number }} updateRoutineConfig
   * @returns {Promise<Routine>}
   */
  update(updateRoutineConfig) {
    return this.httpService
      .put("routines", updateRoutineConfig)
      .then((data) => new Routine(data));
  }

  /**
   * @param {{ id?: number, name?: string }} deleteRoutineConfig
   * @returns {Promise<boolean>}
   */
  delete(deleteRoutineConfig) {
    return this.httpService.delete("routines", deleteRoutineConfig);
  }
}
