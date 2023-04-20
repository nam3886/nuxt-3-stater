declare global {
  interface Window {}

  declare type ValueOf<T> = T[keyof T];

  declare type NilAble<T> = null | undefined | T;

  declare type InvertResult<T extends Record<PropertyKey, PropertyKey>> = {
    [P in keyof T as T[P]]: P;
  };

  declare type ServerTime = `${number}${number}:${number}${number}:${number}${number}`;

  declare type ServerDate =
    `${number}${number}${number}${number}-${number}${number}-${number}${number}`;

  declare type ServerDateTime =
    `${number}${number}${number}${number}-${number}${number}-${number}${number} ${number}${number}:${number}${number}:${number}${number}`;

  declare type ClientTime = ServerTime;

  declare type ClientDate =
    `${number}${number}/${number}${number}/${number}${number}${number}${number}`;

  declare type ClientDateTime =
    `${number}${number}/${number}${number}/${number}${number}${number}${number} ${number}${number}:${number}${number}:${number}${number}`;

  declare type ILocale = 'dark' | 'light';

  declare type ITheme = 'dark' | 'light' | 'system' | 'realtime';

  declare type ISystemTheme = ITheme & ('dark' | 'light');
}

export {};
