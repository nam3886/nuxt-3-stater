import type { QueryKey } from '@tanstack/query-core';
import type { UseMutationOptions, UseQueryOptions } from '@tanstack/vue-query';

declare global {
  declare type MutationOptions<TData = unknown, TVariables = void> = CallAPIOptions &
    Omit<UseMutationOptions<TData | undefined, unknown, TVariables, unknown>, 'mutationFn'>;

  declare type QueryOptions<
    TQueryFnData = unknown,
    TError = unknown,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey
  > = CallAPIOptions &
    Omit<
      UseQueryOptions<TQueryFnData | undefined, TError, TData | undefined, TQueryKey>,
      'queryKey' | 'queryFn'
    >;
}

export {};
