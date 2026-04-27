import { User } from "../models/user.js";

export class UserService {
  constructor(httpService, sessionService) {
    this.httpService = httpService;
    this.sessionService = sessionService;
  }

  /**
   * @returns {User | null}
   */
  getCurrent() {
    const stored = this.sessionService.getStoredUser();
    return stored ? new User(stored) : null;
  }

  logout() {
    this.sessionService.clear();
    window.location.href = "/templates/login.html";
  }

  /**
   * @param {{ id?: number, username?: string, email?: string, name?: string, sex?: string }} getUserConfig
   * @returns {Promise<User[]>}
   */
  get(getUserConfig) {
    return this.httpService
      .get("users", getUserConfig)
      .then((users) => users.map((user) => new User(user)));
  }

  /**
   * @param {{ name: string, username: string, email: string, password: string, heightCm?: number, currentWeightKg?: number, targetWeightKg?: number, birthdate?: string, sex?: string, activityLevel?: string, defaultDietId?: number, defaultRoutineId?: number }} createUserConfig
   * @returns {Promise<User>}
   */
  create(createUserConfig) {
    return this.httpService
      .post("users", createUserConfig)
      .then((user) => new User(user));
  }

  /**
   * @param {{ id: number, name?: string, username?: string, email?: string, password?: string, heightCm?: number, birthdate?: string, sex?: string, activityLevel?: string, goal?: string, defaultDietId?: number, defaultRoutineId?: number, isAdmin?: boolean }} updateUserConfig
   * @returns {Promise<User>}
   */
  update(updateUserConfig) {
    return this.httpService
      .put("users", updateUserConfig)
      .then((user) => new User(user));
  }

  /**
   * @param {{ id?: number, email?: string }} deleteUserConfig
   * @returns {Promise<boolean>}
   */
  delete(deleteUserConfig) {
    return this.httpService.delete("users", deleteUserConfig);
  }
}
