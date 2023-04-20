import {
  type QueryKey,
  type UseQueryOptions as UseReactQueryOptions,
  useQuery as useReactQuery,
} from '@tanstack/vue-query';
import { get } from '@vueuse/core';

export function useQuery<TData = unknown, TError = unknown, TQueryKey extends QueryKey = QueryKey>(
  options: Omit<
    UseReactQueryOptions<AppResponse<TData>, TError, AppResponse<TData>, TQueryKey>,
    'onSuccess'
  > & { onSuccess?: ((data: AppSuccessResponse<TData>) => void) | undefined }
) {
  const onSuccess = get(options.onSuccess);

  return useReactQuery({
    ...options,
    onSuccess: (data) => data?.isOk && onSuccess?.(data),
  });
}

type UseQueryOptions<
  TData = unknown,
  TError = unknown,
  TQueryKey extends QueryKey = QueryKey
> = Parameters<typeof useQuery<TData, TError, TQueryKey>>[0];

export type QueryAPIOptions<TData = unknown, TQueryKey = undefined> = CallAPIOptions &
  UseQueryOptions<TData, unknown, (TQueryKey | undefined)[]>;
