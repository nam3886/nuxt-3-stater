import type { AnySchema } from 'yup';

declare global {
  declare type Shape<Fields extends Record<any, any>> = {
    [Key in keyof Fields]: AnySchema;
  };
}

export {};
