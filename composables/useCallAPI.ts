import { ToastPosition, ToastType, useToast } from '~/composables/useToast';
import { logger } from '~/utils/common';

type APIOptions<T> = Parameters<typeof $fetch<NetworkResponse<T>>>[1] | undefined;

export function useCallAPI(options?: CallAPIOptions) {
  const config = useRuntimeConfig();
  const toast = useToast();

  function API<T = undefined>(url: string, opts?: APIOptions<T>) {
    logger('log', `[call api]: ${url}`);
    const token = '';

    return $fetch<NetworkResponse<T>>(url, {
      baseURL: config.BASE_API_URL,
      headers: {
        authorization: token ? `Bearer ${token}` : '',
        ...opts?.headers,
      },
      ...opts,
    });
  }

  async function handleCallAPI<T>(
    action: () => Promise<NetworkResponse<T>>
  ): Promise<AppResponse<T>> {
    try {
      const result = await action();
      const message = options?.successMessage || result.message;
      handleDisplayMessage(ToastType.SUCCESS, options?.canShowSuccessMessage, message);

      return { data: result.data, error: undefined, isOk: true, message, origin: result };
    } catch (error) {
      const e = error as AppErrorResponse<T>['error'];
      const message = options?.errorMessage || e.data?.message;
      handleDisplayMessage(ToastType.ERROR, !options?.disabledShowErrorMessage, message);
      const newError: AppResponse<T> = {
        data: undefined,
        error: e,
        isOk: false,
        message,
        origin: undefined,
      };
      logger('error', `[call api error]: `, newError.error.data?.message, newError);

      return newError;
    }
  }

  function handleDisplayMessage(type: ToastType, can?: boolean, message?: string) {
    if (can && message) {
      // display message
      toast(message, { position: ToastPosition.BOTTOM_CENTER, type });
    }
  }

  return { API, handleCallAPI };
}
