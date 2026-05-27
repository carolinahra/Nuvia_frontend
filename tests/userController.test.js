import { UserController } from "../src/controllers/user.controller";

describe("UserController", () => {
  let controller;
  let sessionService;
  let view;

  beforeEach(() => {
    sessionService = {
      getCurrentUser: jest.fn(),
      logout: jest.fn()
    };

    view = {
      renderGreeting: jest.fn(),
      bindLogout: jest.fn(),
      bindNavigation: jest.fn()
    };

    controller = new UserController(sessionService, {}, view);

    // 🔥 FIX: mock correcto de location
    delete window.location;
    window.location = {
      href: "",
    };
  });

  test("redirige si no hay usuario", () => {
    sessionService.getCurrentUser.mockReturnValue(null);

    controller.init();

    expect(window.location.href).toBe("/templates/login.html");
  });

  test("renderiza usuario si existe", () => {
    const user = { name: "Juan" };

    sessionService.getCurrentUser.mockReturnValue(user);

    controller.init();

    expect(view.renderGreeting).toHaveBeenCalledWith(user);
    expect(view.bindLogout).toHaveBeenCalled();
    expect(view.bindNavigation).toHaveBeenCalled();
  });

  test("navigateTo cambia página", () => {
    controller.navigateTo("perfil");

    expect(window.location.href).toBe("/templates/perfil.html");
  });

  test("logout funciona", () => {
    sessionService.getCurrentUser.mockReturnValue({ name: "Juan" });

    controller.init();

    const logoutCb = view.bindLogout.mock.calls[0][0];
    logoutCb();

    expect(sessionService.logout).toHaveBeenCalled();
  });

  test("navigation callback funciona", () => {
    sessionService.getCurrentUser.mockReturnValue({ name: "Juan" });

    controller.init();

    const navCb = view.bindNavigation.mock.calls[0][0];
    navCb("dietas");

    expect(window.location.href).toBe("/templates/dietas.html");
  });
});