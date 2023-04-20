import * as Yup from 'yup';

import { $vt, AvailableValidationType } from '~/services/validation/translator';

export function dateRules(fieldPrefix: string) {
  function date(field: string, min?: string, max?: string) {
    let rule = Yup.date().typeError(
      $vt.typeError({ key: `${fieldPrefix}.${field}` }, AvailableValidationType.string)
    );

    if (min) {
      rule = rule.min(min, $vt.minDate({ key: `${fieldPrefix}.${field}` }, min));
    }
    if (max) {
      rule = rule.max(max, $vt.maxDate({ key: `${fieldPrefix}.${field}` }, max));
    }

    return rule;
  }

  function dateRequired(field: string, min?: string, max?: string) {
    return date(field, min, max).required($vt.required({ key: `${fieldPrefix}.${field}` }));
  }

  function dateRequiredIf(
    field: string,
    dependencyField: string,
    condition: unknown,
    min?: string,
    max?: string
  ) {
    return date(field, min, max).when(dependencyField, {
      is: condition,
      then: (schema) => schema.required($vt.required({ key: `${fieldPrefix}.${field}` })),
    });
  }

  return { date, dateRequired, dateRequiredIf };
}
