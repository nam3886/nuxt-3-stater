import * as Yup from 'yup';

import { $vt, AvailableValidationType } from '~/services/validation/translator';

export function arrayRules(fieldPrefix: string) {
  function array(field: string, min?: number, max?: number) {
    let rule = Yup.array().typeError(
      $vt.typeError({ key: `${fieldPrefix}.${field}` }, AvailableValidationType.array)
    );

    if (min) {
      rule = rule.min(min, $vt.min({ key: `${fieldPrefix}.${field}` }, min));
    }
    if (max) {
      rule = rule.max(max, $vt.max({ key: `${fieldPrefix}.${field}` }, max));
    }

    return rule;
  }

  function arrayRequired(field: string, min?: number, max?: number) {
    return array(field, min, max).required($vt.required({ key: `${fieldPrefix}.${field}` }));
  }

  function arrayRequiredIf(
    field: string,
    dependencyField: string,
    condition: unknown,
    min?: number,
    max?: number
  ) {
    return array(field, min, max).when(dependencyField, {
      is: condition,
      then: (schema) => schema.required($vt.required({ key: `${fieldPrefix}.${field}` })),
    });
  }

  return { array, arrayRequired, arrayRequiredIf };
}
