export class ExceptionService {
  constructor(exceptionView) {
    this.exceptionView = exceptionView;
  }

  handle(errorResponse) {
    if (errorResponse.httpCode === 403) {
      localStorage.removeItem("sessionToken");
      window.location.href = "/login.html";
      return;
    }
    this.exceptionView.renderErrorMessage(errorResponse);
  }
}
