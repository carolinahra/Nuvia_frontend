export class ConsultarEstadisticasView {
  renderTrainingSessions(sessions) {
    const monday = this.#getMonday(new Date());
    const statusRow = document.getElementById("training-status-row");
    const totalRow = document.getElementById("training-total-row");
    const summaryEl = document.getElementById("training-summary-value");

    const statusCells = statusRow.querySelectorAll("td");
    const totalCells = totalRow.querySelectorAll("td");

    let totalCompleted = 0;

    for (let i = 0; i < 7; i++) {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);

      const completed = sessions.some((s) => {
        const d = new Date(s.createdAt);
        return (
          d.getFullYear() === day.getFullYear() &&
          d.getMonth() === day.getMonth() &&
          d.getDate() === day.getDate()
        );
      });

      if (completed) {
        statusCells[i + 1].innerHTML = '<span class="estado-completado">✓</span>';
        totalCells[i + 1].textContent = "1/1";
        totalCompleted++;
      } else {
        statusCells[i + 1].innerHTML = '<span class="estado-pendiente">-</span>';
        totalCells[i + 1].textContent = "0/1";
      }
    }

    if (summaryEl) {
      summaryEl.textContent = `${totalCompleted}/7`;
    }
  }

  #getMonday(date) {
    const day = date.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    const monday = new Date(date);
    monday.setDate(date.getDate() + diff);
    monday.setHours(0, 0, 0, 0);
    return monday;
  }

  renderMealLogs(logs, dietPlan) {
    const monday = this.#getMonday(new Date());
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d;
    });

    const dishToMealType = new Map();
    for (const [mealType, dishes] of Object.entries(dietPlan)) {
      for (const dish of dishes) {
        dishToMealType.set(dish.id, mealType);
      }
    }

    const mealRows = [
      { key: "desayuno",     rowId: "meal-row-desayuno" },
      { key: "media-manana", rowId: "meal-row-media-manana" },
      { key: "almuerzo",     rowId: "meal-row-almuerzo" },
      { key: "merienda",     rowId: "meal-row-merienda" },
      { key: "cena",         rowId: "meal-row-cena" },
    ];

    const dailyTotals = new Array(7).fill(0);
    let totalCompleted = 0;

    for (const { key, rowId } of mealRows) {
      const row = document.getElementById(rowId);
      if (!row) {
        continue;
      }
      const cells = row.querySelectorAll("td");

      for (let i = 0; i < 7; i++) {
        const day = days[i];
        const matched = logs.find((log) => {
          const d = new Date(log.createdAt);
          return (
            dishToMealType.get(log.dishId) === key &&
            d.getFullYear() === day.getFullYear() &&
            d.getMonth() === day.getMonth() &&
            d.getDate() === day.getDate()
          );
        });

        if (matched) {
          cells[i + 1].innerHTML = '<span class="estado-completado">✓</span>';
          dailyTotals[i]++;
          totalCompleted++;
        } else {
          cells[i + 1].innerHTML = '<span class="estado-pendiente">-</span>';
        }
      }
    }

    const totalRow = document.getElementById("meal-log-total-row");
    if (totalRow) {
      const totalCells = totalRow.querySelectorAll("td");
      for (let i = 0; i < 7; i++) {
        totalCells[i + 1].textContent = `${dailyTotals[i]}/5`;
      }
    }

    const summaryEl = document.getElementById("meal-summary-value");
    if (summaryEl) {
      summaryEl.textContent = `${totalCompleted}/35`;
    }
  }

  renderWeight(weightKg) {
    const value = weightKg != null ? weightKg : "-";
    const weightCard = document.getElementById("weight-value");
    const weightSummary = document.getElementById("weight-summary-value");

    if (weightCard) {
      weightCard.textContent = value;
    }

    if (weightSummary) {
      weightSummary.textContent = weightKg != null ? `${weightKg} kg` : "-";
    }
  }
}
