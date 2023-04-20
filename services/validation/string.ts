import * as Yup from 'yup';

import { $vt, AvailableValidationType } from '~/services/validation/translator';

export function stringRules(fieldPrefix: string) {
  function string(field: string, min?: number, max?: number) {
    let rule = Yup.string().typeError(
      $vt.typeError({ key: `${fieldPrefix}.${field}` }, AvailableValidationType.string)
    );

    if (min) {
      rule = rule.min(min, $vt.min({ key: `${fieldPrefix}.${field}` }, min));
    }
    if (max) {
      rule = rule.max(max, $vt.max({ key: `${fieldPrefix}.${field}` }, max));
    }

    return rule;
  }

  function stringRequired(field: string, min?: number, max?: number) {
    return string(field, min, max).required($vt.required({ key: `${fieldPrefix}.${field}` }));
  }

  function stringRequiredIf(
    field: string,
    dependencyField: string,
    condition: unknown,
    min?: number,
    max?: number
  ) {
    return string(field, min, max).when(dependencyField, {
      is: condition,
      then: (schema) => schema.required($vt.required({ key: `${fieldPrefix}.${field}` })),
    });
  }

  return { string, stringRequired, stringRequiredIf };
}
