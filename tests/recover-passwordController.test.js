import { RecoverPasswordController } from "../src/controllers/recover-password.controller";

describe("RecoverPasswordController", () => {
  let controller;
  let passwordService;
  let exceptionService;
  let view;

  beforeEach(() => {
    passwordService = {
      forgot: jest.fn(),
      reset: jest.fn()
    };

    exceptionService = {
      handle: jest.fn()
    };

    view = {
      bindForgotForm: jest.fn(),
      bindResetForm: jest.fn(),
      renderError: jest.fn(),
      renderSuccess: jest.fn()
    };

    controller = new RecoverPasswordController(
      passwordService,
      exceptionService,
      view
    );

    // ✅ mock seguro de window.location
    Object.defineProperty(window, "location", {
      value: {
        search: "?token=abc123"
      },
      writable: true
    });
  });

  // ---------------- FORGOT ----------------

  test("forgot: email inválido", () => {
    controller.handleForgot({ email: "malemail" });

    expect(view.renderError).toHaveBeenCalledWith(
      "Por favor, introduce un correo electrónico válido."
    );
  });

  test("forgot: éxito", async () => {
    passwordService.forgot.mockResolvedValue();

    await controller.handleForgot({ email: "test@test.com" });

    expect(passwordService.forgot).toHaveBeenCalled();
    expect(view.renderSuccess).toHaveBeenCalled();
  });

  test("forgot: error API", async () => {
    passwordService.forgot.mockRejectedValue(new Error("fail"));

    await controller.handleForgot({ email: "test@test.com" });

    expect(exceptionService.handle).toHaveBeenCalled();
  });

  // ---------------- RESET ----------------

  test("reset: password corta", () => {
    controller.handleReset({
      password: "123",
      repeatPassword: "123"
    });

    expect(view.renderError).toHaveBeenCalledWith(
      "La contraseña debe tener al menos 6 caracteres."
    );
  });

  test("reset: passwords no coinciden", () => {
    controller.handleReset({
      password: "123456",
      repeatPassword: "999999"
    });

    expect(view.renderError).toHaveBeenCalledWith(
      "Las contraseñas no coinciden."
    );
  });

  test("reset: sin token", () => {
    Object.defineProperty(window, "location", {
      value: { search: "" },
      writable: true
    });

    controller.handleReset({
      password: "123456",
      repeatPassword: "123456"
    });

    expect(view.renderError).toHaveBeenCalledWith(
      "Enlace de recuperación no válido."
    );
  });

  test("reset: éxito", async () => {
    passwordService.reset.mockResolvedValue();

    await controller.handleReset({
      password: "123456",
      repeatPassword: "123456"
    });

    expect(passwordService.reset).toHaveBeenCalledWith({
      token: "abc123",
      password: "123456"
    });

    expect(view.renderSuccess).toHaveBeenCalled();
  });

  test("reset: error API", async () => {
    passwordService.reset.mockRejectedValue(new Error("fail"));

    await controller.handleReset({
      password: "123456",
      repeatPassword: "123456"
    });

    expect(exceptionService.handle).toHaveBeenCalled();
  });
});