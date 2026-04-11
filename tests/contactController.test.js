const { ContactController } = require("../src/controllers/contact.controller");

describe("ContactController", () => {
  let controller;
  let contactService;
  let contactView;

  beforeEach(() => {
    contactService = {
      send: jest.fn()
    };

    contactView = {
      renderError: jest.fn(),
      renderSuccess: jest.fn(),
      bindForm: jest.fn()
    };

    controller = new ContactController(contactService, contactView);
  });

  // ❌ Nombre inválido
  test("nombre inválido", () => {
    controller.handleSubmit({
      name: "A",
      email: "test@test.com",
      subject: "Hola",
      message: "Mensaje válido largo"
    });

    expect(contactView.renderError).toHaveBeenCalledWith(
      "El nombre debe tener al menos 2 caracteres."
    );
  });

  // ❌ Email inválido
  test("email inválido", () => {
    controller.handleSubmit({
      name: "Juan",
      email: "malemail",
      subject: "Hola",
      message: "Mensaje válido largo"
    });

    expect(contactView.renderError).toHaveBeenCalledWith(
      "Por favor, introduce un email válido."
    );
  });

  // ❌ Asunto corto
  test("asunto corto", () => {
    controller.handleSubmit({
      name: "Juan",
      email: "test@test.com",
      subject: "Hi",
      message: "Mensaje válido largo"
    });

    expect(contactView.renderError).toHaveBeenCalledWith(
      "El asunto debe tener al menos 3 caracteres."
    );
  });

  // ❌ Mensaje corto
  test("mensaje corto", () => {
    controller.handleSubmit({
      name: "Juan",
      email: "test@test.com",
      subject: "Hola",
      message: "corto"
    });

    expect(contactView.renderError).toHaveBeenCalledWith(
      "El mensaje debe tener al menos 10 caracteres."
    );
  });

  // ✅ Envío correcto
  test("envío correcto", async () => {
    contactService.send.mockResolvedValue({});

    await controller.handleSubmit({
      name: "Juan",
      email: "test@test.com",
      subject: "Hola",
      message: "Mensaje válido largo"
    });

    expect(contactService.send).toHaveBeenCalled();

    expect(contactView.renderSuccess).toHaveBeenCalledWith(
      "Mensaje enviado correctamente."
    );
  });

  // ❌ Error del servicio
  test("error del servicio", async () => {
    contactService.send.mockRejectedValue({
      errorMessage: "Error envío"
    });

    await controller.handleSubmit({
      name: "Juan",
      email: "test@test.com",
      subject: "Hola",
      message: "Mensaje válido largo"
    });

    expect(contactView.renderError).toHaveBeenCalledWith("Error envío");
  });
});