import { PerfilController } from "../src/controllers/perfil.controller";

describe("PerfilController", () => {
  let controller;
  let userService;
  let userWeightLogService;
  let sessionService;
  let exceptionService;
  let view;

  beforeEach(() => {
    userService = {
      update: jest.fn()
    };

    userWeightLogService = {
      get: jest.fn().mockResolvedValue([]),
      create: jest.fn().mockResolvedValue({})
    };

    sessionService = {
      getCurrentUser: jest.fn()
    };

    exceptionService = {
      handle: jest.fn()
    };

    view = {
      prefillForm: jest.fn(),
      bindForm: jest.fn(),
      prefillWeight: jest.fn(),
      renderSuccess: jest.fn(),
      renderError: jest.fn()
    };

    controller = new PerfilController(
      userService,
      userWeightLogService,
      sessionService,
      exceptionService,
      view
    );

    // 🔥 mock localStorage
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.getItem = jest.fn(() => JSON.stringify({ id: 1 }));

    // 🔥 mock navigation
    delete window.location;
    window.location = { href: "" };
  });

  test("redirige si no hay usuario", () => {
    sessionService.getCurrentUser.mockReturnValue(null);

    controller.init();

    expect(window.location.href).toBe("/templates/login.html");
  });

  test("carga perfil correctamente", async () => {
    sessionService.getCurrentUser.mockReturnValue({
      id: 1,
      activityLevel: "high"
    });

    controller.init();

    await Promise.resolve(); // deja correr setup

    expect(view.prefillForm).toHaveBeenCalled();
    expect(view.bindForm).toHaveBeenCalled();
    expect(userWeightLogService.get).toHaveBeenCalled();
  });

  test("actualiza perfil correctamente", async () => {
    sessionService.getCurrentUser.mockReturnValue({ id: 1 });

    userService.update.mockResolvedValue({
      id: 1,
      name: "Juan"
    });

    const result = controller.handleSubmit({
      name: "Juan",
      currentWeightKg: 80
    });

    await result;

    expect(userService.update).toHaveBeenCalled();
    expect(view.renderSuccess).toHaveBeenCalledWith(
      "Perfil actualizado correctamente."
    );
  });

  test("maneja error de update", async () => {
    sessionService.getCurrentUser.mockReturnValue({ id: 1 });

    userService.update.mockRejectedValue({
      message: "Error"
    });

    await controller.handleSubmit({
      name: "Juan"
    });

    expect(view.renderError).toHaveBeenCalledWith("Error");
  });
});