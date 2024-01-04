export interface IResponseObject<T> {
  status: 'SUCCESS' | 'ERROR';
  message: string;
  data?: T;
  warnings?: any[];
}

export function framedResponse<T>(
  status: 'SUCCESS' | 'ERROR',
  message: string,
  data?: T,
  warnings?: any[],
): IResponseObject<T> {
  return {
    status,
    message,
    data,
    warnings,
  };
}
