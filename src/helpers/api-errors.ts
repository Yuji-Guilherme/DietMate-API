type ApiErrorParameters = { message: string; status: number };

class ApiError extends Error {
  public readonly status: number;

  constructor({ message, status }: ApiErrorParameters) {
    super(message);
    this.status = status;
  }
}

export { ApiError, ApiErrorParameters };
