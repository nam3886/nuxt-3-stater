import { arrayRules } from '~/services/validation/array';
import { booleanRules } from '~/services/validation/boolean';
import { dateRules } from '~/services/validation/date';
import { fileRules } from '~/services/validation/file';
import { numberRules } from '~/services/validation/number';
import { stringRules } from '~/services/validation/string';

export function validationRules(fieldPrefix: string) {
  return {
    ...stringRules(fieldPrefix),
    ...numberRules(fieldPrefix),
    ...booleanRules(fieldPrefix),
    ...arrayRules(fieldPrefix),
    ...fileRules(fieldPrefix),
    ...dateRules(fieldPrefix),
  };
}
