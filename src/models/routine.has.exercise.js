export class RoutineHasExercise {
  constructor({ exerciseId, sets, reps, restSeconds, orderIndex, name, description, intensity }) {
    this.exerciseId = exerciseId;
    this.sets = sets;
    this.reps = reps;
    this.restSeconds = restSeconds;
    this.orderIndex = orderIndex;
    this.name = name;
    this.description = description;
    this.intensity = intensity;
  }
}
