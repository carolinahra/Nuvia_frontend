const TOAST_DURATION_MS = 30000;

const styles = `
  #toast-container {
    position: fixed;
    top: 20px;
    right: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: 9999;
  }

  .toast {
    background-color: #fff;
    border-left: 4px solid #e74c3c;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    padding: 14px 18px;
    min-width: 260px;
    max-width: 360px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    animation: toast-in 0.3s ease;
  }

  .toast.hiding {
    animation: toast-out 0.4s ease forwards;
  }

  .toast-title {
    font-weight: bold;
    color: #e74c3c;
    font-size: 14px;
  }

  .toast-message {
    color: #333;
    font-size: 13px;
  }

  @keyframes toast-in {
    from { opacity: 0; transform: translateX(40px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  @keyframes toast-out {
    from { opacity: 1; transform: translateX(0); }
    to   { opacity: 0; transform: translateX(40px); }
  }
`;

function injectStyles() {
  if (document.getElementById("toast-styles")) return;
  const tag = document.createElement("style");
  tag.id = "toast-styles";
  tag.textContent = styles;
  document.head.appendChild(tag);
}

function getOrCreateContainer() {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }
  return container;
}

export class ExceptionView {
  constructor() {
    injectStyles();
  }

  renderErrorMessage(errorResponse) {
    const container = getOrCreateContainer();

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

    setTimeout(remove, TOAST_DURATION_MS);
  }
}
