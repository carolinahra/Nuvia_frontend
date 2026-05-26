export class WeightLogView {
  bindForm(handler) {
    const form = document.getElementById("weightLogForm");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      handler({
        weightKg: parseFloat(document.getElementById("peso").value),
      });
    });
  }

  resetForm() {
    document.getElementById("weightLogForm").reset();
  }
}
