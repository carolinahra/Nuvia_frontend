import { Routine } from "../models/routine.js";

export class RoutineService {
  constructor(httpService, sessionService) {
    this.httpService = httpService;
    this.sessionService = sessionService;
  }

  get(getRoutineConfig) {
    return this.httpService
      .get("routines", getRoutineConfig)
      .then((data) => data.map((r) => new Routine(r)));
  }

  getById(id) {
    return this.httpService
      .get("routines", { id })
      .then((data) => new Routine(data[0]));
  }

  create(createRoutineConfig) {
    return this.httpService
      .post("routines", createRoutineConfig)
      .then((data) => new Routine(data));
  }

  update(updateRoutineConfig) {
    return this.httpService
      .put("routines", updateRoutineConfig)
      .then((data) => new Routine(data));
  }

  delete(deleteRoutineConfig) {
    return this.httpService.delete("routines", deleteRoutineConfig);
  }
}
