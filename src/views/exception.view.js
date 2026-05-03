export class ExceptionView {
  #ERROR_DURATION_MS = 6000;
  #SUCCESS_DURATION_MS = 3000;

  #getOrCreateContainer() {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      document.body.appendChild(container);
    }
    return container;
  }

  renderErrorMessage(errorResponse) {
    const container = this.#getOrCreateContainer();

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `
      <span class="toast-title">Error ${errorResponse.httpCode || ""}</span>
      <span class="toast-message">${errorResponse.errorMessage}</span>
    `;

    container.appendChild(toast);

    const remove = () => {
      toast.classList.add("hiding");
      toast.addEventListener("animationend", () => toast.remove(), { once: true });
    };

    setTimeout(remove, this.#ERROR_DURATION_MS);
  }

  renderSuccessMessage(message) {
    const container = this.#getOrCreateContainer();

    const toast = document.createElement("div");
    toast.className = "toast success";
    toast.innerHTML = `
      <span class="toast-title">Éxito</span>
      <span class="toast-message">${message}</span>
    `;

    container.appendChild(toast);

    const remove = () => {
      toast.classList.add("hiding");
      toast.addEventListener("animationend", () => toast.remove(), { once: true });
    };

    setTimeout(remove, this.#SUCCESS_DURATION_MS);
  }
}
