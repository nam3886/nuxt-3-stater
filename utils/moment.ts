// @ts-expect-error: TS2304 because the library definition is wrong
// eslint-disable-next-line simple-import-sort/imports
import momentWithLocales from 'moment/min/moment-with-locales';
import type momentJs from 'moment';

export const moment = momentWithLocales as typeof momentJs;

export function setMomentLocale(locale: string) {
  moment.locale(locale);
}

export { type MomentFormatSpecification } from 'moment';
