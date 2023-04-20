/**
 * "Returns true if the item at the given index is the last item in the given array."
 *
 * The first thing to notice is that the function is generic. This means that it can be used with any
 * type of array
 * @param {number} index - The index of the item in the array.
 * @param [items] - The array of items to check.
 * @returns A function that takes an index and an array of items and returns a boolean.
 */
export function isLatestItem<T>(index: number, items?: NilAble<T[]>) {
  if (!items) return false;

  return items[index] === items[items.length - 1];
}
