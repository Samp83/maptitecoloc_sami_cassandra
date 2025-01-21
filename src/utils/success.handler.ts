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
}
