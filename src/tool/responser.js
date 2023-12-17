export class Responser {
  constructor(statusCode, message, data = null) {
    this.error = this.checkError(statusCode);
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  checkError(statusCode) {
    return statusCode >= 400 && statusCode <= 599;
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
    const responseData = { status };
    const responseProps = ["message", "data"];
    const responseValues = [this.message, data];
    responseProps.forEach((prop, i) => {
      const value = responseValues[i];
      if (!value) return;
      responseData[prop] = value;
    });
    return this.h.response(responseData).type(this.type).code(this.statusCode);
  }
}
