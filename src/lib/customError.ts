export interface CustomError extends Error {
  status?: number;
}

export default function CustomError(
  message: string,
  status: number,
): CustomError {
  const error = new Error(message) as CustomError;
  error.status = status;

  return error;
}
