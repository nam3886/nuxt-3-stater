import { DateTimeFormat } from '~/constants';
import type { MomentFormatSpecification } from '~/utils/moment';

/**
 * The function returns the current time in a specified format using the Moment.js library in
 * TypeScript.
 * @param {DateTimeFormat} format - The format parameter is an optional parameter of type
 * DateTimeFormat that specifies the format in which the current time should be returned. If no format
 * is provided, the default format is DateTimeFormat.fe_full_date_time.
 * @returns The function `getCurrentTimeFormat` returns the current date and time in the specified
 * format using the Moment.js library. The format can be specified as an argument, and if no format is
 * provided, it defaults to `DateTimeFormat.fe_full_date_time`.
 */
export function getCurrentTimeFormat(format: DateTimeFormat = DateTimeFormat.fe_full_date_time) {
  return moment().format(format);
}

/**
 * This TypeScript function takes in a time string and returns it formatted according to the specified
 * output format and moment format specification.
 * @param {string} [time] - A string representing a date and/or time in a specific format. It is an
 * optional parameter, meaning it can be undefined.
 * @param {DateTimeFormat} outputFormat - The output format is a DateTimeFormat enum that specifies the
 * desired format of the output string. It has a default value of DateTimeFormat.fe_full_date_time.
 * @param {MomentFormatSpecification} [format] - The `format` parameter is an optional parameter that
 * specifies the format of the input `time` string. It uses the Moment.js library's format
 * specification syntax to define the format. If this parameter is not provided, Moment.js will try to
 * automatically parse the input `time` string based on common date
 * @returns a string value in the specified output format if the input time is valid and can be parsed
 * using the specified format. If the input time is invalid or cannot be parsed, the function returns
 * undefined.
 */
export function getTimeFormat(
  time?: string,
  outputFormat: DateTimeFormat = DateTimeFormat.fe_full_date_time,
  format?: MomentFormatSpecification
): string | undefined {
  const date = moment(time, format);
  if (!date.isValid()) return;

  return moment(time, format).format(outputFormat);
}

/**
 * The function returns the server time in a specified format.
 * @param {string} [time] - The `time` parameter is an optional string that represents a specific time
 * value. If provided, the function will format this time value according to the specified format. If
 * not provided, the function will use the current server time.
 * @param {MomentFormatSpecification} [format] - The `format` parameter is an optional parameter of
 * type `MomentFormatSpecification`. It is used to specify the format in which the time should be
 * returned. If this parameter is not provided, the default format `DateTimeFormat.full_time` will be
 * used. The `MomentFormatSpecification` is a string
 * @returns a value of type `ServerTime | undefined`.
 */
export function getServerTime(
  time?: string,
  format?: MomentFormatSpecification
): ServerTime | undefined {
  return getTimeFormat(time, DateTimeFormat.full_time, format) as ServerTime | undefined;
}

/**
 * This function returns a formatted server date based on the input time and format.
 * @param {string} [time] - The `time` parameter is an optional string that represents a date and time
 * in a specific format. If this parameter is not provided, the function will return the current server
 * date and time.
 * @param {MomentFormatSpecification} [format] - The `format` parameter is an optional parameter of
 * type `MomentFormatSpecification`. It is used to specify the format in which the date should be
 * returned. If this parameter is not provided, the default format specified in the
 * `DateTimeFormat.be_date` constant will be used.
 * @returns a value of type `ServerDate | undefined`. The value is obtained by calling the
 * `getTimeFormat` function with the `time`, `DateTimeFormat.be_date`, and `format` arguments, and then
 * casting the result to `ServerDate | undefined`.
 */
export function getServerDate(
  time?: string,
  format?: MomentFormatSpecification
): ServerDate | undefined {
  return getTimeFormat(time, DateTimeFormat.be_date, format) as ServerDate | undefined;
}

/**
 * This function returns the server date and time in a specified format.
 * @param {string} [time] - The `time` parameter is an optional string that represents a specific date
 * and time in a specific format. If this parameter is not provided, the function will return the
 * current date and time of the server.
 * @param {MomentFormatSpecification} [format] - The `format` parameter is an optional parameter of
 * type `MomentFormatSpecification`. It is used to specify the format in which the date and time should
 * be returned. If this parameter is not provided, the default format specified in the `DateTimeFormat`
 * enum will be used.
 * @returns The function `getServerDateTime` returns a value of type `ServerDateTime` or `undefined`.
 * The value is obtained by calling the `getTimeFormat` function with the `time` parameter, the
 * `DateTimeFormat.be_full_date_time` constant, and the `format` parameter. The result is then cast to
 * either `ServerDateTime` or `undefined`.
 */
export function getServerDateTime(
  time?: string,
  format?: MomentFormatSpecification
): ServerDateTime | undefined {
  return getTimeFormat(time, DateTimeFormat.be_full_date_time, format) as
    | ServerDateTime
    | undefined;
}

/**
 * This TypeScript function returns the client's time in a specified format.
 * @param {string} [time] - An optional string parameter representing the time to be formatted. If not
 * provided, the current time will be used.
 * @param {MomentFormatSpecification} [format] - The `format` parameter is an optional parameter of
 * type `MomentFormatSpecification`. It is used to specify the format in which the time should be
 * returned. If this parameter is not provided, the default format specified in the
 * `DateTimeFormat.full_time` constant will be used.
 * @returns a value of type `ClientTime` or `undefined`. The value is obtained by calling the
 * `getTimeFormat` function with the `time` parameter, the `DateTimeFormat.full_time` constant, and the
 * `format` parameter. The result is then cast to `ClientTime` or `undefined` using the `as` keyword.
 */
export function getClientTime(
  time?: string,
  format?: MomentFormatSpecification
): ClientTime | undefined {
  return getTimeFormat(time, DateTimeFormat.full_time, format) as ClientTime | undefined;
}

/**
 * This TypeScript function returns a formatted date string in a specific format or undefined if no
 * time is provided.
 * @param {string} [time] - The `time` parameter is an optional string that represents a date and/or
 * time value. If provided, it will be used to create a `Moment` object that can be formatted according
 * to the specified `format`. If not provided, the current date and time will be used.
 * @param {MomentFormatSpecification} [format] - The `format` parameter is an optional parameter of
 * type `MomentFormatSpecification`. It is used to specify the format in which the date should be
 * returned. If this parameter is not provided, the default format specified in the
 * `DateTimeFormat.fe_date` constant will be used.
 * @returns a value of type `ClientDate` or `undefined`. The value is obtained by calling the
 * `getTimeFormat` function with the `time`, `DateTimeFormat.fe_date`, and `format` arguments, and then
 * casting the result to `ClientDate` or `undefined`.
 */
export function getClientDate(
  time?: string,
  format?: MomentFormatSpecification
): ClientDate | undefined {
  return getTimeFormat(time, DateTimeFormat.fe_date, format) as ClientDate | undefined;
}

/**
 * This function returns the client's date and time in a specified format, with an optional input time.
 * @param {string} [time] - The `time` parameter is an optional string that represents a date and time
 * in a specific format. If this parameter is not provided, the current date and time will be used.
 * @param {MomentFormatSpecification} [format] - The `format` parameter is an optional parameter of
 * type `MomentFormatSpecification`. It is used to specify the format in which the date and time should
 * be returned. If this parameter is not provided, the default format
 * `DateTimeFormat.fe_full_date_time` will be used. The `MomentFormatSpecification
 * @returns a value of type `ClientDateTime` or `undefined`. The value is obtained by calling the
 * `getTimeFormat` function with the `time` parameter, the `DateTimeFormat.fe_full_date_time`
 * parameter, and the `format` parameter (if provided). The result is then cast to either
 * `ClientDateTime` or `undefined`.
 */
export function getClientDateTime(
  time?: string,
  format?: MomentFormatSpecification
): ClientDateTime | undefined {
  return getTimeFormat(time, DateTimeFormat.fe_full_date_time, format) as
    | ClientDateTime
    | undefined;
}

/**
 * The function checks if a given string matches the format of a server date.
 * @param {string} data - A string that represents a date in the format "YYYY-MM-DD".
 * @returns The function `isServerDate` returns a boolean value indicating whether the input `data` is
 * a string in the format of a server date (YYYY-MM-DD) or not. The return type is `data is
 * ServerDate`, which is a type predicate indicating that if the function returns `true`, the input
 * `data` is of type `ServerDate`.
 */
export function isServerDate(data: string): data is ServerDate {
  return /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(data);
}

/**
 * The function checks if a given string matches the format of a server date and time.
 * @param {string} data - The input string that is being checked to see if it matches the format of a
 * ServerDateTime.
 * @returns The function `isServerDateTime` returns a boolean value indicating whether the input `data`
 * is a string in the format of a server date and time (`yyyy-mm-dd hh:mm:ss`) or not. The return type
 * is `data is ServerDateTime`, which is a type guard that narrows the type of `data` to
 * `ServerDateTime` if the function returns `true`.
 */
export function isServerDateTime(data: string): data is ServerDateTime {
  return /^[0-9]{4}-[0-9]{2}-[0-9]{2}\s[0-9]{2}:[0-9]{2}:[0-9]{2}$/.test(data);
}
