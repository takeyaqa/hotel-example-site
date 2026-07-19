import {
  getCurrencyFormatter,
  getDateLongFormatter,
  getDateShortFormatter,
  getDateShortParser,
} from "./i18n.js";

/**
 * Format currency
 * @param {number} num
 * @returns {string} formated text
 */
export function formatCurrency(num) {
  return getCurrencyFormatter().format(num);
}

/**
 * Format date (long format)
 * @param {Date} date
 * @returns {string} formated text
 */
export function formatDateLong(date) {
  return getDateLongFormatter().format(date);
}

/**
 * Format date (short format)
 * @param {Date} date
 * @returns {string} formated text
 */
export function formatDateShort(date) {
  const formatter = getDateShortFormatter();
  return formatter(date);
}

/**
 * Parse date
 * @param {string} dateString
 * @returns {Date} date
 */
export function parseDate(dateString) {
  const parser = getDateShortParser();
  return parser(dateString);
}

/**
 * Pad zero
 * @param {number} number
 * @returns {string} 0X string
 */
function pad(number) {
  if (number < 10) {
    return "0" + number;
  }
  return "" + number;
}

/**
 * Format date to ISO-format
 * @param {Date} date
 * @returns {string} string
 */
export function formatDateISO(date) {
  return date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate());
}

/**
 * Parse date from ISO-format
 * @param {string} dateString
 * @returns {Date} date
 */
export function parseDateISO(dateString) {
  const arr = dateString.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (!arr || arr.length !== 4) {
    return null;
  }
  const year = parseInt(arr[1], 10);
  const month = parseInt(arr[2], 10);
  const date = parseInt(arr[3], 10);
  return new Date(year, month - 1, date);
}
