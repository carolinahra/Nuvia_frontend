export class UserView {
  renderGreeting(user) {
    const greetingEl = document.getElementById("greeting-name");
    if (greetingEl) {
      greetingEl.textContent = user.name;
    }
  }

  bindLogout(handler) {
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", handler);
    }
  }

  bindNavigation(handler) {
    const navButtons = document.querySelectorAll("[data-section]");
    navButtons.forEach((btn) => {
      btn.addEventListener("click", () => handler(btn.dataset.section));
    });
  }
}
