import { CaloriasController } from "../src/controllers/calorias.controller";

describe("CaloriasController", () => {
  let controller;
  let tmbService;
  let sessionService;
  let exceptionService;
  let view;

  beforeEach(() => {
    tmbService = {
      calculate: jest.fn()
    };

    sessionService = {
      getCurrentUser: jest.fn()
    };

    exceptionService = {
      handle: jest.fn()
    };

    view = {
      renderForm: jest.fn(),
      bindCalculate: jest.fn(),
      renderResults: jest.fn(),
      renderError: jest.fn()
    };

    controller = new CaloriasController(
      tmbService,
      sessionService,
      exceptionService,
      view
    );

    // mock de window.location
    delete window.location;
    window.location = { href: "" };
  });

  // ❌ sin actividad
  test("muestra error si no hay activityLevel", () => {
    controller.handleCalculate("");

    expect(view.renderError).toHaveBeenCalledWith(
      "Selecciona un nivel de actividad."
    );
  });

  // ✅ cálculo correcto
  test("calcula calorías correctamente", async () => {
    tmbService.calculate.mockResolvedValue({
      calories: 2200
    });

    await controller.handleCalculate("moderate");

    expect(tmbService.calculate).toHaveBeenCalledWith({
      activityLevel: "moderate"
    });

    expect(view.renderResults).toHaveBeenCalledWith({
      calories: 2200
    });
  });

  // ❌ error con message
  test("maneja error del servicio con message", async () => {
    tmbService.calculate.mockRejectedValue({
      message: "Error API"
    });

    await controller.handleCalculate("high");

    // 🔥 clave: esperar microtasks del then/catch
    await Promise.resolve();
    await Promise.resolve();

    expect(view.renderError).toHaveBeenCalledWith("Error API");
  });

  // ❌ fallback error
  test("usa mensaje por defecto si no hay errorMessage", async () => {
    tmbService.calculate.mockRejectedValue({});

    await controller.handleCalculate("high");

    // 🔥 clave: esperar microtasks del then/catch
    await Promise.resolve();
    await Promise.resolve();

    expect(view.renderError).toHaveBeenCalledWith(
      "Error al calcular. Asegúrate de tener completos tus datos de perfil (peso, altura, fecha de nacimiento y sexo)."
    );
  });

  // 🚪 init sin usuario
  test("redirige si no hay usuario en sesión", () => {
    sessionService.getCurrentUser.mockReturnValue(null);

    controller.init();

    expect(window.location.href).toBe("/templates/login.html");
  });

  // 🧩 init con usuario
  test("inicializa formulario correctamente", () => {
    sessionService.getCurrentUser.mockReturnValue({
      activityLevel: "low"
    });

    controller.init();

    expect(view.renderForm).toHaveBeenCalledWith("low");
    expect(view.bindCalculate).toHaveBeenCalled();
  });
});