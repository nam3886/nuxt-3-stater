import * as Yup from 'yup';

import { $vt, AvailableValidationType } from '~/services/validation/translator';

export function booleanRules(fieldPrefix: string) {
  function boolean(field: string) {
    return Yup.boolean().typeError(
      $vt.typeError({ key: `${fieldPrefix}.${field}` }, AvailableValidationType.boolean)
    );
  }

  function booleanRequired(field: string) {
    return boolean(field).required($vt.required({ key: `${fieldPrefix}.${field}` }));
  }

  function booleanRequiredIf(field: string, dependencyField: string, condition: unknown) {
    return boolean(field).when(dependencyField, {
      is: condition,
      then: (schema) => schema.required($vt.required({ key: `${fieldPrefix}.${field}` })),
    });
  }

  function confirmationRequired(field: string) {
    return boolean(field).oneOf([true], $vt.confirm({ key: `${fieldPrefix}.${field}` }));
  }

  function confirmationRequiredIf(field: string, dependencyField: string, condition: unknown) {
    return boolean(field).when(dependencyField, {
      is: condition,
      then: (schema) => schema.oneOf([true], $vt.confirm({ key: `${fieldPrefix}.${field}` })),
    });
  }

  return {
    boolean,
    booleanRequired,
    booleanRequiredIf,
    confirmationRequired,
    confirmationRequiredIf,
  };
}
