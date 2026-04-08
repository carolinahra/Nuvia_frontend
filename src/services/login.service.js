export class LoginService {
  constructor(httpService, sessionService) {
    this.httpService = httpService;
    this.sessionService = sessionService;
  }

  /**
   * @param {{ email: string, password: string }} credentials
   * @returns {Promise<void>}
   */
  login(credentials) {
    return this.httpService
      .post("login", credentials)
      .then((response) => {
        this.sessionService.store(response.token, response.user);
      });
  }
}
