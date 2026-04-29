export class ContactView {
  constructor(exceptionView) {
    this.exceptionView = exceptionView;
  }

  bindForm(handler) {
    const form = document.getElementById("contactForm");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      handler({
        name: document.getElementById("contact-name-field").value.trim(),
        email: document.getElementById("contact-email-field").value.trim(),
        subject: document.getElementById("contact-subject-field").value.trim(),
        message: document.getElementById("contact-message-field").value.trim(),
      });
    });
  }

  renderError(message) {
    this.exceptionView.renderErrorMessage({ httpCode: 0, errorMessage: message });
  }

  renderSuccess(message) {
    this.exceptionView.renderSuccessMessage(message);
    document.getElementById("contactForm").reset();
  }
}
