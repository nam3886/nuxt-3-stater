import { moment } from '~/utils/moment';

/**
 * It returns true if the MODE environment variable is set to production
 * @returns A function that returns a boolean value.
 */
export function isProduction() {
  return process.env.NODE_ENV === 'production';
}

/**
 * The function checks if the code is running on the server or in the browser.
 * @returns The function `isServer()` returns a boolean value indicating whether the code is running on
 * the server or in the browser. It returns `true` if the code is running on the server (i.e., `window`
 * is `undefined`), and `false` if the code is running in the browser (i.e., `window` is defined).
 */
export function isServer() {
  return typeof window !== 'undefined';
}

/**
 * The function checks if the code is running on the client side.
 * @returns The function `isClient()` is returning the boolean value `true` if the code is running on
 * the client-side (in a web browser), and `false` if it is running on the server-side (in a Node.js
 * environment). This is determined by calling the `isServer()` function, which is not shown in the
 * code snippet.
 */
export function isClient() {
  return !isServer();
}

/**
 * "If we're in production mode, don't log anything. Otherwise, log the message."
 *
 * The first line of the function is a guard clause. It's a simple if statement that returns if the
 * condition is true. In this case, the condition is isProduction()
 * @param {'error' | 'log' | 'info' | 'dir'} [type=log] - The type of console method to use.
 * @param {any} [message] - The first parameter to log is the message you want to display.
 * @param {any[]} optionalParams - any[]
 * @returns A function that takes in a type, message, and optional parameters.
 */
export function logger(
  type: 'error' | 'log' | 'info' | 'dir' = 'log',
  message?: any,
  ...optionalParams: any[]
) {
  if (isProduction()) return;

  console[type](moment().format('HH:mm:ss DD/MM/YYYY'), message, ...optionalParams);
}

/**
 * It returns a promise that resolves after a given number of milliseconds
 * @param [milliseconds=1] - The number of milliseconds to wait before resolving the promise.
 */
export function wait(milliseconds = 1) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
