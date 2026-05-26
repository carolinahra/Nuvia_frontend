import { WeightLogController } from "../src/controllers/weight-log.controller.js";

describe("WeightLogController", () => {
  let userWeightLogService;
  let exceptionService;
  let exceptionView;
  let weightLogView;
  let controller;

  beforeEach(() => {
    userWeightLogService = { create: jest.fn() };
    exceptionService = { handle: jest.fn() };
    exceptionView = { renderSuccessMessage: jest.fn() };
    weightLogView = { bindForm: jest.fn(), resetForm: jest.fn() };

    controller = new WeightLogController(
      userWeightLogService,
      exceptionService,
      exceptionView,
      weightLogView
    );
  });

  test("peso cero llama a exceptionService.handle", () => {
    controller.handleSubmit({ weightKg: 0 });

    expect(exceptionService.handle).toHaveBeenCalledWith(
      expect.objectContaining({ errorMessage: "Introduce un peso válido mayor que 0." })
    );
    expect(userWeightLogService.create).not.toHaveBeenCalled();
  });

  test("peso negativo llama a exceptionService.handle", () => {
    controller.handleSubmit({ weightKg: -5 });

    expect(exceptionService.handle).toHaveBeenCalledWith(
      expect.objectContaining({ errorMessage: "Introduce un peso válido mayor que 0." })
    );
    expect(userWeightLogService.create).not.toHaveBeenCalled();
  });

  test("peso válido llama a create con weightKg", async () => {
    userWeightLogService.create.mockResolvedValue({});

    await controller.handleSubmit({ weightKg: 75 });

    expect(userWeightLogService.create).toHaveBeenCalledWith({ weightKg: 75 });
  });

  test("registro exitoso muestra mensaje de éxito y resetea formulario", async () => {
    userWeightLogService.create.mockResolvedValue({});

    await controller.handleSubmit({ weightKg: 75 });

    expect(exceptionView.renderSuccessMessage).toHaveBeenCalledWith(
      "Peso registrado correctamente."
    );
    expect(weightLogView.resetForm).toHaveBeenCalled();
  });

  test("error del servicio llama a exceptionService.handle", async () => {
    const error = { httpCode: 500, errorMessage: "Error del servidor" };
    userWeightLogService.create.mockRejectedValue(error);

    await controller.handleSubmit({ weightKg: 75 });

    expect(exceptionService.handle).toHaveBeenCalledWith(error);
    expect(exceptionView.renderSuccessMessage).not.toHaveBeenCalled();
  });
});
