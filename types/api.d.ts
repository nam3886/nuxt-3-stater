import type { FetchError } from 'ofetch';

declare global {
  declare type NetworkResponse<T> = {
    code: number;
    data: T;
    message?: string;
  };

  declare type DataWithPagination<T> = {
    data: T[];
    limit: number;
    page: number;
    total: number;
  };

  declare type AppSuccessResponse<T> = {
    data: T;
    error: undefined;
    isOk: true;
    origin: NetworkResponse<T>;
    message?: string;
  };

  declare type AppErrorResponse<T> = {
    data: undefined;
    error: FetchError<NetworkResponse<T>>;
    isOk: false;
    origin: undefined;
    message?: string;
  };

  declare type AppResponse<T> = AppErrorResponse<T> | AppSuccessResponse<T>;

  declare type CallAPIOptions = {
    canShowSuccessMessage?: boolean;
    disabledShowErrorMessage?: boolean;
    errorMessage?: string;
    successMessage?: string;
  };
}

export {};
