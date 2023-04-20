// eslint-disable-next-line simple-import-sort/imports
import { createI18n } from 'vue-i18n';

// @ts-expect-error: TS2571 because the library definition is wrong
import en from '~/locales/en.yml';

// @ts-expect-error: TS2571 because the library definition is wrong
import vi from '~/locales/vi.yml';

export enum AvailableValidationType {
  array = 'array',
  boolean = 'boolean',
  number = 'number',
  object = 'object',
  string = 'string',
}
type FieldType<T extends string = string> = { key: T; translated?: boolean };

interface IValidationTranslator {
  confirm: (field: FieldType) => string;
  confirmationField: (field: FieldType, confirmationField: FieldType) => string;
  email: (field: FieldType) => string;
  matches: (field: FieldType) => string;
  max: (field: FieldType, max: number | string) => string;
  maxDate: (field: FieldType, max: number | string) => string;
  min: (field: FieldType, min: number | string) => string;
  minDate: (field: FieldType, min: number | string) => string;
  required: (field: FieldType) => string;
  typeError: (field: FieldType, type: AvailableValidationType) => string;
}

// FIXME: https://github.com/intlify/nuxt3/issues/76
// https://github.com/nuxt-modules/i18n/issues/1831
const i18n = createI18n({
  availableLocales: ['en', 'vi'],
  fallbackLocale: 'en',
  locale: 'vi',
  messages: { en, vi },
});

// @ts-expect-error: TS2589 because the library definition is wrong
const { t } = i18n.global;

class ValidationTranslator implements IValidationTranslator {
  public confirm({ key, translated }: FieldType): string {
    if (!translated) key = capitalizeFirstLetter(t(key));

    return capitalizeFirstLetter(t('validation.rules.confirm', { field: key }));
  }

  public matches({ key, translated }: FieldType): string {
    if (!translated) key = capitalizeFirstLetter(t(key));

    return capitalizeFirstLetter(t('validation.rules.matches', { field: key }));
  }

  public email({ key, translated }: FieldType): string {
    if (!translated) key = capitalizeFirstLetter(t(key));

    return capitalizeFirstLetter(t('validation.rules.matches', { field: key }));
  }

  public max({ key, translated }: FieldType, max: number | string): string {
    if (!translated) key = capitalizeFirstLetter(t(key));

    return capitalizeFirstLetter(t('validation.rules.max', { field: key, max }));
  }

  public min({ key, translated }: FieldType, min: number | string): string {
    if (!translated) key = capitalizeFirstLetter(t(key));

    return capitalizeFirstLetter(t('validation.rules.min', { field: key, min }));
  }

  public minDate({ key, translated }: FieldType, min: number | string): string {
    if (!translated) key = capitalizeFirstLetter(t(key));

    return capitalizeFirstLetter(
      t('validation.rules.min', { field: key, min: getClientDateTime(min.toString()) })
    );
  }

  public maxDate({ key, translated }: FieldType, max: number | string): string {
    if (!translated) key = capitalizeFirstLetter(t(key));

    return capitalizeFirstLetter(
      t('validation.rules.max', { field: key, max: getClientDateTime(max.toString()) })
    );
  }

  public required({ key, translated }: FieldType): string {
    if (!translated) key = capitalizeFirstLetter(t(key));

    return capitalizeFirstLetter(t('validation.rules.required', { field: key }));
  }

  public typeError({ key, translated }: FieldType, type: AvailableValidationType): string {
    const types = {
      array: 'validation.type.array',
      boolean: 'validation.type.boolean',
      number: 'validation.type.number',
      object: 'validation.type.object',
      string: 'validation.type.string',
    };

    if (!translated) key = capitalizeFirstLetter(t(key));

    return capitalizeFirstLetter(
      t('validation.rules.type_error', { field: key, type: t(types[type]) })
    );
  }

  public confirmationField({ key, translated }: FieldType, confirmationField: FieldType): string {
    if (!translated) key = capitalizeFirstLetter(t(key));

    return capitalizeFirstLetter(
      t('validation.rules.field_confirmation', {
        confirmation_field: confirmationField.key,
        field: key,
      })
    );
  }
}

export const $vt = new ValidationTranslator();
