import { AxiosError, AxiosResponse } from 'axios';

export const attachDeveloperIdHeader = (
  id: string,
  headers?: Record<string, string>
) => ({
  ...headers,
  'X-Portal-Developer-ID': id,
});

type ResponseNormal<TData> = AxiosResponse<TData> & { error: undefined };
type ResponseAbnormal<TError> = AxiosError<TError> & {
  data: undefined;
  error: TError;
};
type Response<TData, TError> = ResponseNormal<TData> | ResponseAbnormal<TError>;

export class APIError extends Error {
  readonly #raw: AxiosError;

  constructor(
    public override message: string,
    public status: number,
    public method: string,
    public url: string,
    raw: AxiosError
  ) {
    super(message);
    this.stack = undefined;
    this.#raw = raw;
  }

  static fromAxiosError = <TError>(error: ResponseAbnormal<TError>) => {
    const errorMsg =
      error.error && (error.error as { error_msg?: string }).error_msg;

    return new APIError(
      `Request failed: ${
        errorMsg
          ? errorMsg
          : error.status
          ? `with status code ${error.status}`
          : error.message
      }`,
      error.status ?? 0,
      error.config?.method?.toUpperCase() ?? '',
      error.config?.url ?? '',
      error
    );
  };

  /**
   * Check if the given error is an instance of APIError.
   * @param error The error to check.
   * @returns True if the error is an instance of APIError, false otherwise.
   */
  static isAPIError = (error: unknown): error is APIError =>
    error instanceof APIError;

  /**
   * Get the original raw Axios error.
   * @returns {AxiosError} The original Axios error.
   */
  public rawError(): AxiosError {
    return this.#raw;
  }
}

export const transformResponse = <TData, TError>(
  resp: Response<TData, TError>
) => {
  if (resp.error || (resp.status && resp.status >= 400))
    throw APIError.fromAxiosError(resp as ResponseAbnormal<TError>);
  return resp.data as TData;
};
