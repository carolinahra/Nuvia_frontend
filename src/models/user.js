export class User {
  constructor({ id, name, username, email, password, heightCm, birthdate, sex, activityLevel, goal, defaultDietId, defaultRoutineId, isAdmin }) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.heightCm = heightCm;
    this.birthdate = birthdate;
    this.sex = sex;
    this.activityLevel = activityLevel;
    this.goal = goal;
    this.defaultDietId = defaultDietId;
    this.defaultRoutineId = defaultRoutineId;
    this.isAdmin = isAdmin;
  }
}
