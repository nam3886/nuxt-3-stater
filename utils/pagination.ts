export function getTotalPages<T>(data?: DataWithPagination<T>) {
  if (!data) return undefined;

  return Math.ceil(data.total / data.limit);
}
