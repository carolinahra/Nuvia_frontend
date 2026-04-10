const { LoginController } = require("../src/controllers/login.controller");

describe("LoginController", () => {
    let loginService;
    let loginView;
    let controller;

    beforeEach(() => {
        loginService = { login: jest.fn() };
        loginView = {
            renderError: jest.fn(),
            bindForm: jest.fn()
        };

        controller = new LoginController(loginService, loginView);
        delete window.location;

        window.location = {
            href: "http://localhost/",
            assign: jest.fn(),
            replace: jest.fn()
        };
    });

    test("email inválido", () => {
        controller.handleSubmit({
            email: "malemail",
            password: "123456"
        });

        expect(loginView.renderError).toHaveBeenCalledWith(
            "Por favor, introduce un correo electrónico válido."
        );
    });

    test("password corta", () => {
        controller.handleSubmit({
            email: "test@test.com",
            password: "123"
        });

        expect(loginView.renderError).toHaveBeenCalledWith(
            "La contraseña debe tener al menos 6 caracteres."
        );
    });

    test("login correcto", async () => {
        loginService.login.mockResolvedValue({});

        await controller.handleSubmit({
            email: "test@test.com",
            password: "123456"
        });

        expect(loginService.login).toHaveBeenCalled();
        expect(window.location.href).toContain("/views/home.html");
    });

    test("error servicio", async () => {
        loginService.login.mockRejectedValue({ errorMessage: "Error login" });

        await controller.handleSubmit({
            email: "test@test.com",
            password: "123456"
        });

        expect(loginView.renderError).toHaveBeenCalledWith("Error login");
    });
});