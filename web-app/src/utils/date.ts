import moment from 'moment';

/**
 * @example
'2019-06-01': YYYY-MM-DD
 * @example
'June 1st, 2019': MMMM Do, YYYY
 * @example
'June \'19': MMMM 'YY'
 * @example
'6/1/2019': M/D/YYY'
 */
export const formatDate = (date: Date, format: string): string =>
  moment(date).format(format);

export const weekNumberFromDate = (date: Date | string | number): number =>
  moment(date).isoWeek();
