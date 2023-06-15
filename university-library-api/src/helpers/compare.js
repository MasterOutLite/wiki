import {toString, toInt, toObject} from 'helpers/transform';

export const compareInt = (value1, value2) => toInt(value1) === toInt(value2);

export const compareString = (value1, value2) => toString(value1) === toString(value2);

export const compareObject = (value1, value2) => JSON.stringify(toObject(value1)) === JSON.stringify(toObject(value2));
