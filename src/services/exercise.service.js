import { Exercise } from "../models/exercise.js";

export class ExerciseService {
  constructor(httpService, sessionService) {
    this.httpService = httpService;
    this.sessionService = sessionService;
  }

  get(getExerciseConfig) {
    return this.httpService
      .get("exercises", getExerciseConfig)
      .then((data) => data.map((e) => new Exercise(e)));
  }

  getById(id) {
    return this.httpService
      .get("exercises", { id })
      .then((data) => new Exercise(data[0]));
  }

  create(createExerciseConfig) {
    return this.httpService
      .post("exercises", createExerciseConfig)
      .then((data) => new Exercise(data));
  }

  update(updateExerciseConfig) {
    return this.httpService
      .put("exercises", updateExerciseConfig)
      .then((data) => new Exercise(data));
  }

  delete(deleteExerciseConfig) {
    return this.httpService.delete("exercises", deleteExerciseConfig);
  }
}
