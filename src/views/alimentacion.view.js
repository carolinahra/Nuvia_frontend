export class AlimentacionView {
  mealLabels = {
    desayuno:       'Desayuno',
    'media-manana':  'Media-mañana',
    almuerzo:        'Almuerzo',
    merienda:       'Merienda',
    cena:           'Cena',
  };

  renderMealSections(grouped, completedDishIds) {
    const container = document.getElementById('alimentacionContainer');
    if (!container) return;
    container.innerHTML = '';

    for (const [mealType, label] of Object.entries(this.mealLabels)) {
      const dishes = grouped[mealType] ?? [];
      container.appendChild(this.buildMealSection(mealType, label, dishes, completedDishIds));
    }
  }

  buildMealSection(mealType, label, dishes, completedDishIds) {
    const section = document.createElement('div');
    section.className = 'alimentacion-meal-section';
    section.dataset.meal = mealType;

    const selectBox = document.createElement('div');
    selectBox.className = 'alimentacion-select-box';

    const lbl = document.createElement('label');
    lbl.className = 'alimentacion-select-label';
    lbl.htmlFor = `select-${mealType}`;
    lbl.textContent = label;

    const select = document.createElement('select');
    select.className = 'alimentacion-select';
    select.id = `select-${mealType}`;

    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = 'Selecciona un plato';
    select.appendChild(placeholder);

    dishes.forEach((dish) => {
      const opt = document.createElement('option');
      opt.value = dish.id;
      opt.textContent = dish.name;
      select.appendChild(opt);
    });

    if (completedDishIds && dishes.some((d) => completedDishIds.has(d.id))) {
      select.disabled = true;
    }

    selectBox.appendChild(lbl);
    selectBox.appendChild(select);

    const dishArea = document.createElement('div');
    dishArea.className = 'alimentacion-dish-area';
    dishArea.id = `dish-area-${mealType}`;

    section.appendChild(selectBox);
    section.appendChild(dishArea);
    return section;
  }

  renderDishCard(mealType, dish, isCompleted) {
    const area = document.getElementById(`dish-area-${mealType}`);
    if (!area) return;

    area.innerHTML = '';
    if (!dish) return;

    const article = document.createElement('article');
    article.className = 'alimentacion-meal';

    const info = document.createElement('div');
    info.className = 'alimentacion-meal-info';

    const name = document.createElement('h3');
    name.className = 'alimentacion-meal-name';
    name.textContent = dish.name;

    const desc = document.createElement('p');
    desc.className = 'alimentacion-meal-description';
    desc.textContent = dish.ingredients ?? '';

    info.appendChild(name);
    info.appendChild(desc);

    const actions = document.createElement('div');
    actions.className = 'alimentacion-meal-actions';

    if (dish.calories) {
      const kcal = document.createElement('span');
      kcal.className = 'alimentacion-kcal';
      kcal.textContent = `${dish.calories} kcal`;
      actions.appendChild(kcal);
    }

    const btn = document.createElement('button');
    btn.className = 'alimentacion-complete-btn' + (isCompleted ? ' completed' : '');
    btn.type = 'button';
    btn.dataset.dishId = dish.id;
    btn.dataset.meal = mealType;
    btn.textContent = isCompleted ? 'Completado ✓' : 'Completar';
    btn.disabled = isCompleted;
    actions.appendChild(btn);

    article.appendChild(info);
    article.appendChild(actions);
    area.appendChild(article);
  }

  preSelectDish(mealType, dishId) {
    const select = document.getElementById(`select-${mealType}`);
    if (select) select.value = dishId;
  }

  bindMealSelects(handler) {
    document.getElementById('alimentacionContainer')?.addEventListener('change', (e) => {
      const select = e.target.closest('select.alimentacion-select');
      if (!select) return;
      const mealType = select.closest('[data-meal]')?.dataset.meal;
      const dishId = select.value ? Number(select.value) : null;
      handler(mealType, dishId);
    });
  }

  bindCompleteButtons(handler) {
    document.getElementById('alimentacionContainer')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.alimentacion-complete-btn:not(.completed)');
      if (!btn) return;
      handler(Number(btn.dataset.dishId), btn.dataset.meal, btn);
    });
  }

  markCompleted(btn) {
    btn.textContent = 'Completado ✓';
    btn.classList.add('completed');
    btn.disabled = true;
  }

  renderError(message) {
    const container = document.getElementById('alimentacionContainer');
    if (!container) return;
    container.innerHTML = `<p class="alimentacion-error">${message}</p>`;
  }

  renderSuccess(message) {
    let toast = document.getElementById('alimentacion-success-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'alimentacion-success-toast';
      toast.className = 'entrenamiento-success-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('visible');
    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(() => toast.classList.remove('visible'), 3000);
  }
}
