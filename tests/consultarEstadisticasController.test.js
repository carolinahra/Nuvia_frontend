import { ConsultarEstadisticasController } from "../src/controllers/consultar-estadisticas.controller.js";

describe("ConsultarEstadisticasController", () => {
  let userWeightLogService;
  let trainingSessionService;
  let mealLogService;
  let dietService;
  let sessionService;
  let exceptionService;
  let consultarEstadisticasView;
  let controller;

  beforeEach(() => {
    userWeightLogService = { get: jest.fn() };
    trainingSessionService = { get: jest.fn() };
    mealLogService = { get: jest.fn() };
    dietService = { getDishesByDiet: jest.fn() };
    sessionService = { getCurrentUser: jest.fn() };
    exceptionService = { handle: jest.fn() };
    consultarEstadisticasView = {
      renderWeight: jest.fn(),
      renderTrainingSessions: jest.fn(),
      renderMealLogs: jest.fn(),
    };

    controller = new ConsultarEstadisticasController(
      userWeightLogService,
      trainingSessionService,
      mealLogService,
      dietService,
      sessionService,
      exceptionService,
      consultarEstadisticasView
    );
  });

  // loadLatestWeight

  test("sin registros de peso llama a renderWeight con null", async () => {
    userWeightLogService.get.mockResolvedValue([]);

    await controller.loadLatestWeight();

    expect(consultarEstadisticasView.renderWeight).toHaveBeenCalledWith(null);
  });

  test("con varios registros renderiza el más reciente", async () => {
    userWeightLogService.get.mockResolvedValue([
      { weightKg: 70, createdAt: "2025-05-20T10:00:00Z" },
      { weightKg: 72, createdAt: "2025-05-25T10:00:00Z" },
      { weightKg: 68, createdAt: "2025-05-22T10:00:00Z" },
    ]);

    await controller.loadLatestWeight();

    expect(consultarEstadisticasView.renderWeight).toHaveBeenCalledWith(72);
  });

  test("error en weight logs llama a exceptionService.handle", async () => {
    const error = { httpCode: 500, errorMessage: "Error" };
    userWeightLogService.get.mockRejectedValue(error);

    await controller.loadLatestWeight();

    expect(exceptionService.handle).toHaveBeenCalledWith(error);
  });

  // loadWeeklyTrainingSessions

  test("sesiones de entrenamiento llama a renderTrainingSessions", async () => {
    const sessions = [{ id: 1, routineId: 2, createdAt: "2025-05-26T09:00:00Z" }];
    trainingSessionService.get.mockResolvedValue(sessions);

    await controller.loadWeeklyTrainingSessions();

    expect(consultarEstadisticasView.renderTrainingSessions).toHaveBeenCalledWith(sessions);
  });

  test("error en sesiones llama a exceptionService.handle", async () => {
    const error = { httpCode: 500, errorMessage: "Error" };
    trainingSessionService.get.mockRejectedValue(error);

    await controller.loadWeeklyTrainingSessions();

    expect(exceptionService.handle).toHaveBeenCalledWith(error);
  });

  // loadWeeklyMealLogs

  test("sin defaultDietId no llama a ningún servicio", async () => {
    sessionService.getCurrentUser.mockReturnValue({ defaultDietId: null });

    await controller.loadWeeklyMealLogs();

    expect(mealLogService.get).not.toHaveBeenCalled();
    expect(dietService.getDishesByDiet).not.toHaveBeenCalled();
  });

  test("con defaultDietId llama a renderMealLogs con logs y plan", async () => {
    sessionService.getCurrentUser.mockReturnValue({ defaultDietId: 3 });
    const logs = [{ id: 1, dishId: 10, createdAt: "2025-05-26T08:00:00Z" }];
    const dietPlan = { desayuno: [{ id: 10 }], almuerzo: [] };
    mealLogService.get.mockResolvedValue(logs);
    dietService.getDishesByDiet.mockResolvedValue(dietPlan);

    await controller.loadWeeklyMealLogs();

    expect(dietService.getDishesByDiet).toHaveBeenCalledWith(3);
    expect(consultarEstadisticasView.renderMealLogs).toHaveBeenCalledWith(logs, dietPlan);
  });

  test("error en meal logs llama a exceptionService.handle", async () => {
    sessionService.getCurrentUser.mockReturnValue({ defaultDietId: 3 });
    const error = { httpCode: 500, errorMessage: "Error" };
    mealLogService.get.mockRejectedValue(error);
    dietService.getDishesByDiet.mockResolvedValue({});

    await controller.loadWeeklyMealLogs();

    expect(exceptionService.handle).toHaveBeenCalledWith(error);
  });
});
