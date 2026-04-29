export class ContactService {
  constructor(httpService) {
    this.httpService = httpService;
  }

  send({ name, email, subject, message }) {
    return this.httpService.post("contacto", { name, email, subject, message });
  }
}
