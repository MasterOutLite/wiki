import {isEmpty, isString, isNumber, isArray} from 'helpers/check';

export const toFloat = value =>
  isEmpty(value)
    ? 0
    : isString(value)
    ? parseFloat(value ? value.replace(/,/, '.').replace(/[^\d.]/g, '') : '0')
    : isNumber(value)
    ? parseFloat(value)
    : 0;

export const toInt = value => (isEmpty(value) ? 0 : isNumber(parseInt(value)) ? parseInt(value) : 0);

export const toBool = value => (isEmpty(value) ? false : value === '0' ? false : !!value);

export const toString = value => (isEmpty(value) ? '' : value.toString());

export const toArray = value => (isEmpty(value) ? [] : isArray(value) ? value : [value]);

export const toObject = value => (isEmpty(value) ? {} : value);

export const toEmail = value => {
  const matchResult = value.match(
    // eslint-disable-next-line max-len
    /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/
  );
  return (matchResult && matchResult[0]) || '';
};
