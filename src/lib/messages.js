import { getMessages } from "./i18n.js";

/**
 * Get translated message
 * @param {string} key
 * @param {...string} params
 * @return {string}
 */
export function t() {
  const params = Array.prototype.slice.call(arguments);
  const key = params.shift();
  let messageStore = getMessages();
  const keys = key.split(".");
  let message;
  for (let i = 0; i < keys.length; i++) {
    message = messageStore[keys[i]];
    if (typeof message === "string") {
      break;
    } else {
      messageStore = messageStore[keys[i]];
    }
  }
  for (let i = 0; i < params.length; i++) {
    message = message.replace("{}", params[i]);
  }
  return message;
}
