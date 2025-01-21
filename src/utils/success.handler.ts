export class SuccessHandler<T> {
  status: number;
  message: string;
  data: T | null;

  constructor(status: number, message: string, data: T | null = null) {
    this.status = status;
    this.message = message;
    this.data = data;
  }

  static success<T>(
    message: string,
    data: T | null = null,
    status = 200
  ): SuccessHandler<T> {
    return new SuccessHandler(status, message, data);
  }
  static created<T>(message: string, data: T | null = null): SuccessHandler<T> {
    return new SuccessHandler(201, message, data);
  }

  static noContent(message: string): SuccessHandler<null> {
    return new SuccessHandler(204, message, null);
  }

  static custom<T>(
    status: number,
    message: string,
    data: T | null = null
  ): SuccessHandler<T> {
    return new SuccessHandler(status, message, data);
  }
}
