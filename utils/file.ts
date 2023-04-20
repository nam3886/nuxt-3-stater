import type { FileUploadModel } from '~/models';

/**
 * This function converts a FileUploadModel object to a string by returning its URL property or an
 * empty string if the object is undefined.
 * @param {FileUploadModel} [file] - The `file` parameter is an optional argument of type
 * `FileUploadModel`. It represents a file that has been uploaded to the application and contains
 * information such as the file's name, size, and URL. If the `file` parameter is not provided, the
 * function will return an empty string.
 * @returns a string which is either the URL of the file if it exists, or an empty string if the file
 * is undefined.
 */
export function fileUploadToString(file?: FileUploadModel): string {
  return file?.url || '';
}

/**
 * This TypeScript function takes an array of FileUploadModel objects, filters out any objects without
 * a URL property, and returns an array of the URL values as strings.
 * @param {FileUploadModel[]} [files] - The `files` parameter is an optional array of `FileUploadModel`
 * objects.
 * @returns The function `filesUploadToStrings` is returning an array of strings. The array contains
 * the URLs of the files that have been uploaded, which are extracted from an array of
 * `FileUploadModel` objects passed as an argument to the function. If the argument is not provided or
 * is null/undefined, an empty array is returned.
 */
export function filesUploadToStrings(files?: FileUploadModel[]): string[] {
  return files?.filter((f) => f.url).map((f) => f.url || '') || [];
}

/**
 * This TypeScript function converts a string URL into a FileUploadModel object with a success status
 * and the same URL.
 * @param {string} [url] - The `url` parameter is an optional string that represents the URL of a file
 * to be uploaded. If the `url` parameter is not provided, the function returns `undefined`. If the
 * `url` parameter is provided, the function returns a `FileUploadModel` object with the `name`,
 * @returns A function that takes an optional string parameter `url` and returns either a
 * `FileUploadModel` object or `undefined`. If `url` is not provided, the function returns `undefined`.
 * If `url` is provided, the function returns a `FileUploadModel` object with the `name`, `status`, and
 * `url` properties set to the value of `url`.
 */
export function stringToFileUpload(url?: string): FileUploadModel | undefined {
  if (!url) return undefined;

  return { name: url, status: 'success', url };
}

/**
 * This TypeScript function converts an array of strings representing URLs into an array of
 * FileUploadModel objects with success status and corresponding URLs.
 * @param {string[]} [urls] - The `urls` parameter is an optional array of strings that represent URLs.
 * If provided, the function will filter out any falsy values (such as empty strings or null values)
 * and map each URL to a `FileUploadModel` object with a `name` property set to the URL, a
 * @returns The function `stringsToFilesUpload` returns an array of `FileUploadModel` objects. If the
 * `urls` parameter is provided and is not null or undefined, it filters out any empty or falsy strings
 * from the array and maps each string to a `FileUploadModel` object with the `name` property set to
 * the string, the `status` property set to `'success'`,
 */
export function stringsToFilesUpload(urls?: string[]): FileUploadModel[] {
  return urls?.filter((u) => u).map((url) => ({ name: url, status: 'success', url })) || [];
}

/**
 * This TypeScript function checks if a given object is a valid FileUploadModel.
 * @param {any} [file] - The `file` parameter is an optional variable of any type that is being checked
 * if it is a `FileUploadModel`.
 * @returns a boolean value. It returns `true` if the `file` parameter is an object of type
 * `FileUploadModel` and has a `status` property that is a string and one of the values in the
 * `availableStatuses` array. Otherwise, it returns `false`.
 */
export function isFileUpload(file?: any): file is FileUploadModel {
  if (useIsEmpty(file) || !useIsObject(file)) return false;
  const availableStatuses = ['ready', 'uploading', 'success', 'fail'];
  const cloneData = { ...file } as FileUploadModel;

  return useIsString(cloneData.status) && availableStatuses.includes(cloneData.status);
}
