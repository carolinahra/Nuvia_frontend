export class PasswordService {
  constructor(httpService) {
    this.httpService = httpService;
  }

  /**
   * @param {{ email: string }} params
   * @returns {Promise<object>}
   */
  forgot({ email }) {
    return this.httpService.post("password/forgot", { email });
  }

  /**
   * @param {{ token: string, password: string }} params
   * @returns {Promise<object>}
   */
  reset({ token, password }) {
    return this.httpService.post("password/reset", { token, password });
  }
}
