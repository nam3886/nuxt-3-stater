import { type TypedRouteLocationRaw, TypedRoute } from '@typed-router';

type LinkWrapper<T extends object = {}> = { to?: TypedRouteLocationRaw } & T;

export { LinkWrapper, TypedRoute };
