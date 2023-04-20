type AvailableEnum = { [index: string | number]: string | number };

/**
 * This TypeScript function retrieves the key of an enum object based on its value.
 * @param {T} enumObject - The enum object that we want to search through to find the key that
 * corresponds to the given value.
 * @param {string | number} value - The `value` parameter is a string or number that we want to find
 * the corresponding key for in the given `enumObject`.
 * @returns a key of the provided enum object that corresponds to the given value, or undefined if no
 * such key is found. The key is of type keyof T, which is a union type of all the keys in the enum
 * object.
 */
export function getEnumKeyByValue<T extends AvailableEnum>(
  enumObject: T,
  value: string | number
): keyof T | undefined {
  const keys = Object.keys(enumObject) as Array<keyof T>;

  for (const key of keys) {
    if (enumObject[key] === value) {
      return key;
    }
  }

  return undefined;
}

/**
 * This TypeScript function converts an enum object into an array of key-value pairs.
 * @param {T} enumObject - The `enumObject` parameter is an object representing an enum in TypeScript.
 * It contains key-value pairs where the keys are the names of the enum members and the values are
 * their corresponding values. The function `enumToArray` takes this enum object as input and returns
 * an array of objects, where each object
 * @returns The function `enumToArray` is returning an array of objects with two properties: `key` and
 * `value`. The `key` property is a string representing the name of each key in the input `enumObject`,
 * and the `value` property is a string or number representing the value associated with each key in
 * the `enumObject`. The function is using the `Object.entries` method to convert
 */
export function enumToArray<T extends AvailableEnum>(
  enumObject: T
): { key: string; value: string | number }[] {
  return Object.entries(enumObject).map(([key, value]) => ({ key, value }));
}
