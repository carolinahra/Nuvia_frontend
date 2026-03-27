export class Exception extends Error {
  constructor({ httpCode, errorMessage }) {
    super(errorMessage);
    this.httpCode = httpCode;
    this.errorMessage = errorMessage;
  }
}
