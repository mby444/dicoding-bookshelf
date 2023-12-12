export class Responser {
  static checkError = (statusCode) => statusCode >= 400 && statusCode <= 599;

  constructor(statusCode, message, data = null) {
    this.error = Responser.checkError(statusCode);
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

export class HapiResponser extends Responser {
  constructor(h, statusCode, message, data = null) {
    super(statusCode, message, data);
    this.h = h;
    this.type = "application/json";
  }

  response(data = null) {
    const status = this.error ? "fail" : "success";
    if (data) {
      return this.h
        .response({
          status,
          message: this.message,
          data,
        })
        .type(this.type)
        .code(this.statusCode);
    }
    return this.h
      .response({
        status,
        message: this.message,
      })
      .type(this.type)
      .code(this.statusCode);
  }
}
