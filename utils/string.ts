/**
 * "Capitalize the first letter of each word in a string."
 *
 * The first thing we do is check if the input is a string. If it isn't, we return a string that says
 * "Input must be a string"
 * @param {string} [str] - The string to capitalize.
 * @returns A function that takes a string as an argument and returns a string.
 */
export function capitalize(str?: string): string {
  if (typeof str !== 'string') {
    return 'Input must be a string';
  }

  str = str.trim().toLowerCase().replace(/\s+/g, ' ');

  return str.replace(/\b\w/g, (l) => l.toUpperCase());
}

/**
 * Capitalize the first letter of a string.
 * @param [str] - The string to capitalize.
 * @returns The first letter of the string is being capitalized and the rest of the string is being
 * returned.
 */
export function capitalizeFirstLetter(str = '') {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * It replaces all underscores with spaces, and then capitalizes the first letter of each word
 * @param [str] - The string to convert.
 * @returns A function that takes a string and returns a string with the first letter capitalized and
 * the rest lowercase.
 */
export function snakeToNormal(str = '') {
  return str.replace(/^_*(.)|_+(.)/g, (_, c, d) => (c ? c.toUpperCase() : ' ' + d.toUpperCase()));
}

/**
 * It takes a string, splits it into words, then reduces the words to their first letter, and finally
 * returns the result as an uppercase string
 * @param [str] - The string to get the first letters from.
 * @returns The first letter of each word in the string.
 */
export function getFirstLetters(str = '') {
  return str
    .split(/\s/)
    .reduce((response, word) => (response += word.slice(0, 1)), '')
    .toUpperCase();
}

/**
 * Generate a random string of a given length, where the first character is a letter and the remaining
 * characters are letters or numbers
 * @param {number} length - The length of the string to generate.
 * @returns A string of random characters
 */
export function generateRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  // Generate first character as a letter
  result += characters.charAt(Math.floor(Math.random() * 52));

  // Generate remaining characters
  for (let i = 1; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

/**
 * It takes a string, removes all HTML tags from it, and returns the result
 * @param {string} str - The string to be stripped of HTML tags.
 * @returns the string with all HTML tags removed.
 */
export function removeHtmlTags(str: string): string {
  const regex = /(<([^>]+)>)/gi;

  return str.replace(regex, '');
}

/**
 * It returns a URL object if the string is a valid URL, otherwise it returns false
 * @param str - The string to check.
 * @returns A URL object or false
 */
export function isURL(str: NilAble<string>) {
  if (!str) return false;
  try {
    return new URL(str);
  } catch (error) {
    return false;
  }
}

/**
 * It takes a value of type T or string and returns a value of type T or null
 * @param {T | string} data - T | string
 * @returns A function that takes a generic type T and returns a generic type T or null.
 */
export function parseData<T>(data: T | string): T | null {
  if (!useIsString(data)) return data;

  try {
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
}
