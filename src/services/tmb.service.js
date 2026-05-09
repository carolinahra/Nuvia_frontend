export class TmbService {
  constructor(httpService) {
    this.httpService = httpService;
  }

  /**
   * @param {{ activityLevel: string }} params
   * @returns {Promise<{ tmb: number, get: number, imc: number, ingestaDiariaKcal: number }>}
   */
  calculate(params) {
    return this.httpService.get("tmb", params);
  }
}
