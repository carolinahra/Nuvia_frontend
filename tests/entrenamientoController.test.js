import { EntrenamientoController } from "../src/controllers/entrenamiento.controller";

describe("EntrenamientoController", () => {
  let controller;
  let routineService;
  let routineHasExerciseService;
  let sessionService;
  let trainingSessionService;
  let exceptionService;
  let view;

  beforeEach(() => {
    routineService = { get: jest.fn() };
    routineHasExerciseService = { getByRoutineId: jest.fn() };
    sessionService = { getCurrentUser: jest.fn() };
    trainingSessionService = { create: jest.fn() };
    exceptionService = { handle: jest.fn() };

    view = {
      bindBackButton: jest.fn(),
      bindRoutineSelect: jest.fn(),
      bindCompleteButton: jest.fn(),
      renderRoutineDropdown: jest.fn(),
      renderRoutine: jest.fn(),
      renderSuccess: jest.fn()
    };

    controller = new EntrenamientoController(
      routineService,
      routineHasExerciseService,
      sessionService,
      trainingSessionService,
      exceptionService,
      view
    );
  });

  // 🟢 loadAll
  test("carga rutinas y selecciona default", async () => {
    sessionService.getCurrentUser.mockReturnValue({
      defaultRoutineId: 10
    });

    routineService.get.mockResolvedValue([
      { id: 10, name: "Rutina A" },
      { id: 20, name: "Rutina B" }
    ]);

    routineHasExerciseService.getByRoutineId.mockResolvedValue([]);

    controller.loadAll();

    await Promise.resolve();
    await Promise.resolve();

    expect(routineService.get).toHaveBeenCalled();
    expect(view.renderRoutineDropdown).toHaveBeenCalledWith(
      expect.any(Array),
      10
    );
  });

  // 🟢 loadExercises
  test("carga ejercicios de rutina", async () => {
    controller.routines = [{ id: 10 }];

    routineHasExerciseService.getByRoutineId.mockResolvedValue([
      { id: 1, name: "Push Up" }
    ]);

    controller.loadExercises(10);

    await Promise.resolve();
    await Promise.resolve();

    expect(routineHasExerciseService.getByRoutineId).toHaveBeenCalledWith(10);
    expect(view.renderRoutine).toHaveBeenCalled();
  });

  // 🟢 handleComplete
  test("completa rutina", async () => {
    controller.currentRoutineId = 10;

    trainingSessionService.create.mockResolvedValue({});

    controller.handleComplete();

    await Promise.resolve();
    await Promise.resolve();

    expect(trainingSessionService.create).toHaveBeenCalledWith({
      routineId: 10
    });

    expect(view.renderSuccess).toHaveBeenCalledWith("¡Rutina completada!");
  });

  // 🔴 error handling
  test("maneja error en loadAll", async () => {
    routineService.get.mockRejectedValue("error");

    controller.loadAll();

    await Promise.resolve();
    await Promise.resolve();

    expect(exceptionService.handle).toHaveBeenCalled();
  });
});