import * as Yup from 'yup';

import { $vt, AvailableValidationType } from '~/services/validation/translator';

export function numberRules(fieldPrefix: string) {
  function number(field: string, min?: number, max?: number) {
    let rule = Yup.number().typeError(
      $vt.typeError({ key: `${fieldPrefix}.${field}` }, AvailableValidationType.number)
    );

    if (min) {
      rule = rule.min(min, $vt.min({ key: `${fieldPrefix}.${field}` }, min));
    }
    if (max) {
      rule = rule.max(max, $vt.max({ key: `${fieldPrefix}.${field}` }, max));
    }

    return rule;
  }

  function numberRequired(field: string, min?: number, max?: number) {
    return number(field, min, max).required($vt.required({ key: `${fieldPrefix}.${field}` }));
  }

  function numberRequiredIf(
    field: string,
    dependencyField: string,
    condition: unknown,
    min?: number,
    max?: number
  ) {
    return number(field, min, max).when(dependencyField, {
      is: condition,
      then: (schema) => schema.required($vt.required({ key: `${fieldPrefix}.${field}` })),
    });
  }

  return { number, numberRequired, numberRequiredIf };
}
