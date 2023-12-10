export class Responser {
  static checkError = (statusCode) => statusCode >= 400 && statusCode <= 599;

  constructor(statusCode, message, data = null) {
    this.error = Responser.checkError(statusCode);
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}
