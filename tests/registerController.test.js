import { RegisterController } from "../src/controllers/register.controller";

describe("RegisterController", () => {
  let controller;
  let userService;
  let registerView;

  beforeEach(() => {
    userService = {
      create: jest.fn()
    };

    registerView = {
      bindForm: jest.fn(),
      renderError: jest.fn()
    };

    controller = new RegisterController(userService, registerView);

    // mock window.location
    Object.defineProperty(window, "location", {
      value: { href: "" },
      writable: true
    });
  });

  test("password demasiado corta", () => {
    controller.handleSubmit({
      name: "Juan",
      username: "juan",
      email: "test@test.com",
      password: "123",
      confirmPassword: "123"
    });

    expect(registerView.renderError).toHaveBeenCalledWith(
      "La contraseña debe tener al menos 6 caracteres."
    );
  });

  test("passwords no coinciden", () => {
    controller.handleSubmit({
      name: "Juan",
      username: "juan",
      email: "test@test.com",
      password: "123456",
      confirmPassword: "999999"
    });

    expect(registerView.renderError).toHaveBeenCalledWith(
      "Las contraseñas no coinciden."
    );
  });

  test("registro correcto", async () => {
    userService.create.mockResolvedValue({ id: 1 });

    await controller.handleSubmit({
      name: "Juan",
      username: "juan",
      email: "test@test.com",
      password: "123456",
      confirmPassword: "123456",
      sex: "male",
      heightCm: 180,
      currentWeightKg: 80,
      targetWeightKg: 75
    });

    expect(userService.create).toHaveBeenCalledWith({
      name: "Juan",
      username: "juan",
      email: "test@test.com",
      password: "123456",
      sex: "male",
      heightCm: 180,
      currentWeightKg: 80,
      targetWeightKg: 75
    });

    expect(window.location.href).toBe("/templates/login.html");
  });

  test("error del backend", async () => {
    userService.create.mockRejectedValue({
      message: "Error API"
    });

    await controller.handleSubmit({
      name: "Juan",
      username: "juan",
      email: "test@test.com",
      password: "123456",
      confirmPassword: "123456"
    });

    expect(registerView.renderError).toHaveBeenCalledWith("Error API");
  });
});