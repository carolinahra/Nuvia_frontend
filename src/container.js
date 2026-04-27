import { HTTPService } from "./services/http.service.js";
import { ExceptionService } from "./services/exception.service.js";
import { SessionService } from "./services/session.service.js";
import { LoginService } from "./services/login.service.js";
import { UserService } from "./services/user.service.js";
import { DietService } from "./services/diet.service.js";
import { MealLogService } from "./services/meallog.service.js";
import { WeightLogService } from "./services/weightlog.service.js";
import { ExceptionView } from "./views/exception.view.js";
import { LoginView } from "./views/login.view.js";
import { RegisterView } from "./views/register.view.js";
import { UserView } from "./views/user.view.js";
import { LoginController } from "./controllers/login.controller.js";
import { RegisterController } from "./controllers/register.controller.js";
import { UserController } from "./controllers/user.controller.js";

export class Container {
  #props = {};
  #config;

  constructor(config) {
    this.#config = config;
  }

  // ─── Servicios base ────────────────────────────────────────────

  get httpService() {
    if (this.#props.httpService) return this.#props.httpService;
    this.#props.httpService = new HTTPService(this.#config.http);
    return this.#props.httpService;
  }

  get exceptionView() {
    if (this.#props.exceptionView) return this.#props.exceptionView;
    this.#props.exceptionView = new ExceptionView();
    return this.#props.exceptionView;
  }

  get exceptionService() {
    if (this.#props.exceptionService) return this.#props.exceptionService;
    this.#props.exceptionService = new ExceptionService(this.exceptionView);
    return this.#props.exceptionService;
  }

  get sessionService() {
    if (this.#props.sessionService) return this.#props.sessionService;
    this.#props.sessionService = new SessionService(this.httpService);
    return this.#props.sessionService;
  }

  // ─── Servicios de dominio ──────────────────────────────────────

  get loginService() {
    if (this.#props.loginService) return this.#props.loginService;
    this.#props.loginService = new LoginService(this.httpService, this.sessionService);
    return this.#props.loginService;
  }

  get userService() {
    if (this.#props.userService) return this.#props.userService;
    this.#props.userService = new UserService(this.httpService, this.sessionService);
    return this.#props.userService;
  }

  get dietService() {
    if (this.#props.dietService) return this.#props.dietService;
    this.#props.dietService = new DietService(this.httpService, this.sessionService);
    return this.#props.dietService;
  }

  get mealLogService() {
    if (this.#props.mealLogService) return this.#props.mealLogService;
    this.#props.mealLogService = new MealLogService(this.httpService, this.sessionService);
    return this.#props.mealLogService;
  }

  get weightLogService() {
    if (this.#props.weightLogService) return this.#props.weightLogService;
    this.#props.weightLogService = new WeightLogService(this.httpService, this.sessionService);
    return this.#props.weightLogService;
  }

  // ─── Vistas ────────────────────────────────────────────────────

  get loginView() {
    if (this.#props.loginView) return this.#props.loginView;
    this.#props.loginView = new LoginView(this.exceptionView);
    return this.#props.loginView;
  }

  get userView() {
    if (this.#props.userView) return this.#props.userView;
    this.#props.userView = new UserView();
    return this.#props.userView;
  }

  get registerView() {
    if (this.#props.registerView) return this.#props.registerView;
    this.#props.registerView = new RegisterView(this.exceptionView);
    return this.#props.registerView;
  }

  get loginController() {
    if (this.#props.loginController) return this.#props.loginController;
    this.#props.loginController = new LoginController(
      this.loginService,
      this.loginView
    );
    return this.#props.loginController;
  }

  get userController() {
    if (this.#props.userController) return this.#props.userController;
    this.#props.userController = new UserController(
      this.userService,
      this.exceptionService,
      this.userView
    );
    return this.#props.userController;
  }

  get registerController() {
    if (this.#props.registerController) return this.#props.registerController;
    this.#props.registerController = new RegisterController(
      this.userService,
      this.registerView
    );
    return this.#props.registerController;
  }
}

