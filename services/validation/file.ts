import * as Yup from 'yup';

import { $vt, AvailableValidationType } from '~/services/validation/translator';

export function fileRules(fieldPrefix: string) {
  function fileUpload(field: string) {
    return Yup.object()
      .typeError($vt.typeError({ key: `${fieldPrefix}.${field}` }, AvailableValidationType.object))
      .transform((value) => (isFileUpload(value) ? value : undefined));
  }

  function fileUploadRequired(field: string) {
    return fileUpload(field).required($vt.required({ key: `${fieldPrefix}.${field}` }));
  }

  function fileUploadRequiredIf(field: string, dependencyField: string, condition: unknown) {
    return fileUpload(field).when(dependencyField, {
      is: condition,
      then: (schema) => schema.required($vt.required({ key: `${fieldPrefix}.${field}` })),
    });
  }

  return { fileUpload, fileUploadRequired, fileUploadRequiredIf };
}
