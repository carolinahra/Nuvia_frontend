export class TrainingSession {
  constructor({ id, userId, routineId, completedAt }) {
    this.id = id;
    this.userId = userId;
    this.routineId = routineId;
    this.completedAt = completedAt;
  }
}
