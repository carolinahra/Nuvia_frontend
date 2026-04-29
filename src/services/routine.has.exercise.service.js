import { RoutineHasExercise } from "../models/routine.has.exercise.js";

export class RoutineHasExerciseService {
  constructor(httpService, sessionService) {
    this.httpService = httpService;
    this.sessionService = sessionService;
  }

  getByRoutineId(routineId) {
    return this.httpService
      .get(`routines/${routineId}/exercises`, {})
      .then((data) => data.map((e) => new RoutineHasExercise(e)));
  }

  getById(routineId, exerciseId) {
    return this.httpService
      .get(`routines/${routineId}/exercises/${exerciseId}`, {})
      .then((data) => new RoutineHasExercise(data));
  }

  create(routineId, createConfig) {
    return this.httpService.post(`routines/${routineId}/exercises`, createConfig);
  }

  update(routineId, exerciseId, updateConfig) {
    return this.httpService.put(`routines/${routineId}/exercises/${exerciseId}`, updateConfig);
  }

  delete(routineId, exerciseId) {
    return this.httpService.delete(`routines/${routineId}/exercises/${exerciseId}`, {});
  }
}
