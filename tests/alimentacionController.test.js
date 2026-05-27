import { AlimentacionController } from "../src/controllers/alimentacion.controller";

const flushPromises = () => new Promise(resolve => setTimeout(resolve, 0));

describe("AlimentacionController", () => {
  let controller;
  let dietService;
  let mealLogService;
  let sessionService;
  let exceptionService;
  let view;

  beforeEach(() => {
    dietService = {
      getDishesByDiet: jest.fn()
    };

    mealLogService = {
      get: jest.fn(),
      create: jest.fn()
    };

    sessionService = {
      getCurrentUser: jest.fn()
    };

    exceptionService = {
      handle: jest.fn()
    };

    view = {
      bindMealSelects: jest.fn(),
      bindCompleteButtons: jest.fn(),
      renderMealSections: jest.fn(),
      renderDishCard: jest.fn(),
      preSelectDish: jest.fn(),
      renderError: jest.fn(),
      renderSuccess: jest.fn(),
      markCompleted: jest.fn()
    };

    controller = new AlimentacionController(
      dietService,
      mealLogService,
      sessionService,
      exceptionService,
      view
    );
  });

  test("muestra error si el usuario no tiene dieta", () => {
    sessionService.getCurrentUser.mockReturnValue({
      id: 1,
      defaultDietId: null
    });

    controller.load();

    expect(view.renderError).toHaveBeenCalledWith(
      "No tienes un plan de alimentación asignado."
    );
  });

  test("carga dieta y logs correctamente", async () => {
    sessionService.getCurrentUser.mockReturnValue({
      id: 1,
      defaultDietId: 10
    });

    dietService.getDishesByDiet.mockResolvedValue({
      lunch: [{ id: 2, name: "Pollo" }]
    });

    mealLogService.get.mockResolvedValue([
      { dishId: 2 }
    ]);

    await controller.load();

    await flushPromises();

    expect(dietService.getDishesByDiet).toHaveBeenCalledWith(10);
    expect(mealLogService.get).toHaveBeenCalled();

    expect(view.renderMealSections).toHaveBeenCalled();
    expect(view.preSelectDish).toHaveBeenCalled();
    expect(view.renderDishCard).toHaveBeenCalled();
  });

  test("handleMealSelect muestra plato correcto", () => {
    controller.grouped = {
      lunch: [{ id: 2, name: "Pollo" }]
    };

    controller.completedDishIds = [2];

    controller.handleMealSelect("lunch", 2);

    expect(view.renderDishCard).toHaveBeenCalledWith(
      "lunch",
      { id: 2, name: "Pollo" },
      true
    );
  });

  test("handleComplete guarda comida y actualiza UI", async () => {
    mealLogService.create.mockResolvedValue({});

    await controller.handleComplete(5, "button");

    await flushPromises();

    expect(mealLogService.create).toHaveBeenCalledWith({
      dishId: 5
    });

    expect(view.markCompleted).toHaveBeenCalledWith("button");

    expect(view.renderSuccess).toHaveBeenCalledWith(
      "¡Plato completado!"
    );
  });

  test("maneja error del servicio", async () => {
    mealLogService.create.mockRejectedValue(new Error("fail"));

    await controller.handleComplete(5, "button");

    await flushPromises();

    expect(exceptionService.handle).toHaveBeenCalled();
  });
});