/**
 * It takes a number, converts it to a string, replaces the decimal point with a comma, adds thousand
 * separators, and returns the result
 * @param {number | string | undefined | null} num - number | string | undefined | null
 * @returns A function that returns a string
 */
export function numberFormat(num: number | string | undefined | null): string {
  if (!num) return '0';

  return Number(num)
    .toFixed(2)
    .replace('.', ',')
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/**
 * It converts a string or number to a number
 * @param {string | number | undefined | null} num - string | number | undefined | null
 * @returns A function that takes a string, number, undefined, or null and returns a number.
 */
export function toNumber(num: string | number | undefined | null) {
  if (useIsNil(num)) return num;

  return Number(num);
}
