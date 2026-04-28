export class ContactController {
  #emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor(contactService, contactView) {
    this.contactService = contactService;
    this.contactView = contactView;
  }

  init() {
    document.addEventListener("DOMContentLoaded", () => {
      this.contactView.bindForm((data) => this.handleSubmit(data));
    });
  }

  handleSubmit({ name, email, subject, message }) {
    if (!name || name.trim().length < 2) {
      this.contactView.renderError("El nombre debe tener al menos 2 caracteres.");
      return;
    }

    if (!this.#emailRegex.test(email)) {
      this.contactView.renderError("Por favor, introduce un email válido.");
      return;
    }

    if (!subject || subject.trim().length < 3) {
      this.contactView.renderError("El asunto debe tener al menos 3 caracteres.");
      return;
    }

    if (!message || message.trim().length < 10) {
      this.contactView.renderError("El mensaje debe tener al menos 10 caracteres.");
      return;
    }

    return this.contactService
      .send({ name, email, subject, message })
      .then(() => {
        this.contactView.renderSuccess("Mensaje enviado correctamente.");
      })
      .catch((error) => {
        this.contactView.renderError(error.errorMessage ?? error.message);
      });
  }
}

