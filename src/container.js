import { HTTPService } from "./services/http.service.js";
import { ExceptionService } from "./services/exception.service.js";
import { SessionService } from "./services/session.service.js";
import { UserService } from "./services/user.service.js";
import { ExceptionView } from "./views/exception.view.js";
import { UserView } from "./views/user.view.js";
import { LoginController } from "./controllers/login.controller.js";
import { UserController } from "./controllers/user.controller.js";

export class Container {
  #props = {};
  #config;

  constructor(config) {
    this.#config = config;
  }

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

  get userService() {
    if (this.#props.userService) return this.#props.userService;
    this.#props.userService = new UserService(this.httpService);
    return this.#props.userService;
  }

  get userView() {
    if (this.#props.userView) return this.#props.userView;
    this.#props.userView = new UserView();
    return this.#props.userView;
  }

  get loginController() {
    if (this.#props.loginController) return this.#props.loginController;
    this.#props.loginController = new LoginController(
      this.sessionService,
      this.exceptionService,
      this.exceptionView
    );
    return this.#props.loginController;
  }

  get userController() {
    if (this.#props.userController) return this.#props.userController;
    this.#props.userController = new UserController(
      this.sessionService,
      this.userService,
      this.exceptionService,
      this.userView
    );
    return this.#props.userController;
  }
}
