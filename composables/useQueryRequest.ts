import { type MaybeRef, get } from '@vueuse/core';
import { parse as qsParse, stringify as qsStringify } from 'qs';
import { computed, ref, watch } from 'vue';
import { type RouteLocationNormalizedLoaded, useRoute, useRouter } from 'vue-router';

import type { QueryState } from '~/models';

type Options<T extends object> = {
  defaultQuery?: MaybeRef<QueryState<T>>;
  onGlobalSearchChange?: MaybeRef<(search: string) => void>;
  syncWithRouteQuery?: MaybeRef<boolean>;
};

const SEARCH_DEBOUNCE_TIME = 300; // ms

/**
 * A reactive query request object that manages the state of pagination, sorting, and search filters for a server-side table.
 */
export function useQueryRequest<T extends object>(options?: Options<T>) {
  const router = useRouter();
  const route = useRoute();

  // Get the default query state, syncWithRouteQuery flag, and onGlobalSearchChange callback, if provided, as computed properties
  const defaultQuery = computed(() => get(options?.defaultQuery));
  const syncWithRouteQuery = computed(() => get(options?.syncWithRouteQuery));
  const onGlobalSearchChange = computed(() => get(options?.onGlobalSearchChange));

  // Define reactive properties for our query, query string, and other internal state
  const query = ref(
    getQuery(route, defaultQuery.value, syncWithRouteQuery.value)
  ) as globalThis.Ref<QueryState<T>>;
  const queryStringified = computed(() => stringifyRequestQuery(query.value));
  const queryFilters = computed(() => getFilters());
  const queryString = ref(queryStringified.value);
  const isPushingQueryToUrl = ref(false);

  // Watcher to update the URL when the query changes
  watch(queryStringified, onQueryStringifiedChanged);

  // Watcher to update the query when the URL changes
  watch(() => route.query, onRouteQueryChanged);

  // Reactive properties for the global search term and sorting state of a table
  const globalSearch = ref(query.value.q || '');
  const debounceSearch = useDebounce((search: string) => {
    query.value.q = search;
    onGlobalSearchChange.value?.(search);
  }, SEARCH_DEBOUNCE_TIME);

  // Watcher to debounce the global search term and trigger the `onGlobalSearchChange` callback
  watch(globalSearch, (search) => debounceSearch(search));

  // Computed property for the current table sort state, derived from the query state object
  const tableSort = computed({
    get: () => {
      const key = query.value.sort_column;
      const order = query.value.sort_kind === 'ASC' ? 'asc' : 'desc';

      return !key ? undefined : [{ key, order }];
    },
    set: (val) => {
      const sort = useFirst(val);
      query.value.sort_column = sort?.key;
      query.value.sort_kind = !sort ? undefined : sort.order === 'asc' ? 'ASC' : 'DESC';
    },
  });

  /**
   * Returns a filtered subset of the current query state object that excludes pagination, search, and sorting properties.
   */
  function getFilters() {
    return useOmit(query.value, ['page', 'limit', 'column', 'kind', 'q']) as T;
  }

  /**
   * Sets the filter properties of the query state object to the provided values.
   */
  function setFilters(filters: T) {
    query.value = {
      limit: query.value.limit,
      page: query.value.page,
      q: query.value.q,
      sort_column: query.value.sort_column,
      sort_kind: query.value.sort_kind,
      ...filters,
    };

    // Trigger a query string update by calling the `onQueryStringifiedChanged` function with the updated query string
    return onQueryStringifiedChanged(queryStringified.value);
  }

  /**
   * Handles changes to the `queryStringified` computed property by updating the `queryString` property and pushing it to the URL if `syncWithRouteQuery` is true.
   */
  async function onQueryStringifiedChanged(newQueryStringified: string) {
    // If the new value is the same as the current value, return early
    if (queryString.value === newQueryStringified) return Promise.resolve();
    queryString.value = newQueryStringified;

    // If we're not syncing with the route query, return early
    if (!syncWithRouteQuery.value) return Promise.resolve();

    isPushingQueryToUrl.value = true;
    const result = await router.push(`${route.path}?${newQueryStringified}`);
    isPushingQueryToUrl.value = false;

    logger('log', 'sync QUERY_STATE to URL');

    return result;
  }

  /**
   * Handles changes to the route query by updating the query state object, but only if we're not currently in the process of pushing our own query to the URL.
   */
  function onRouteQueryChanged() {
    // If we're not syncing with the route query or if we're pushing our own query to the URL, return early
    if (!syncWithRouteQuery.value || isPushingQueryToUrl.value) return;

    const newQuery = getQuery(route, defaultQuery.value, syncWithRouteQuery.value);

    // If the new query string is the same as the current one, return early
    if (stringifyRequestQuery(newQuery) === queryStringified.value) return;

    query.value = newQuery;

    // NOTE: disable trigger queryStringified
    queryString.value = queryStringified.value;
    logger('log', 'sync URL to QUERY_STATE');
  }

  return {
    globalSearch,
    query,
    queryFilters,
    queryString,
    setFilters,
    tableSort,
  };
}

/**
 * Returns a string representation of the provided state object in query string format.
 */
function stringifyRequestQuery<T extends object>(state: QueryState<T>): string {
  // Define a local copy of the qs.stringify() function with default options
  const stringify: typeof qsStringify = (obj, options) =>
    qsStringify(obj, { arrayFormat: 'brackets', skipNulls: true, ...options });

  // Separate the various parts of the state object into different strings using the `stringify()` function with appropriate filters
  const pagination = stringify(state, { filter: ['page', 'limit'] });
  const sort = stringify(state, { filter: ['column', 'kind'] });
  const search = stringify(state, { filter: ['q'] });
  const filters = stringify(
    usePickBy(useOmit(state, ['page', 'limit', 'column', 'kind', 'q']), useNegate(useIsNil))
  );

  // Combine the non-empty parts back into a single query string and return it
  return [pagination, sort, search, filters].filter(Boolean).join('&');
}

/**
 * Parses the provided query string into a query state object.
 */
function parseQuery<T extends object>(query: string): QueryState<T> {
  // Parse the query string using the qs.parse() function and cast it to the appropriate type.
  // This function is generic, meaning it can handle query state objects of any type specified by `T`.
  return qsParse(query) as unknown as QueryState<T>;
}

/**
 * Returns a query state object derived from the provided route and default query state object.
 */
function getQuery<T extends object>(
  route: RouteLocationNormalizedLoaded,
  defaultQuery?: QueryState<T>,
  syncWithRouteQuery = true
): QueryState<T> {
  // Extract the query string from the route if syncing with the route query is enabled
  const queryString = syncWithRouteQuery
    ? route.fullPath.replace(`${route.path}?`, '').replace(route.path, '')
    : '';

  // Parse the query string into a query state object using the `parseQuery` function
  const query = parseQuery(queryString);

  // Fill the parsed query state object with default values for missing properties, using the `fillState` function
  const newQuery = usePickBy(fillState(query), useNegate(useIsNil));
  const newDefaultState = fillState(defaultQuery);

  // Merge the filled query state object with the filled default query state object, if present, and return the result
  return { ...newDefaultState, ...newQuery };
}

/**
 * Returns a new query state object filled with default values for missing properties, based on the provided object.
 */
function fillState<T extends object>(defaultQuery?: QueryState<T>): QueryState<T> {
  // Omit the pagination, sorting and search criteria from the default query state object, if present
  const filters = useOmit(defaultQuery, ['page', 'limit', 'column', 'kind', 'q']);

  // Build a new query state object by merging the filtered default query state object with specific default values for the pagination and sorting criteria
  return {
    ...(filters as T),
    limit: Number(defaultQuery?.limit) || undefined,
    page: Number(defaultQuery?.page) || undefined,
    q: defaultQuery?.q,
    sort_column: defaultQuery?.sort_column,
    sort_kind: defaultQuery?.sort_kind,
  };
}
