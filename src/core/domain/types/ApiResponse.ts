export type ApiResponse<T = Record<string, unknown>> = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
};
