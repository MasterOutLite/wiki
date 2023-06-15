import crypto from 'crypto';
import moment from 'moment';
import {v4 as uuidv4} from 'uuid';

export const fromArray = data => data[Math.floor(Math.random() * data.length)];

export const int = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const bool = () => Math.random() > 0.5;

export const uuid = () => uuidv4();

export const date = (today = true) => {
  const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const todayDate = moment();

  const timeObj = {
    year: today ? todayDate.year() : rand(2000, todayDate.year()),
    month: today ? todayDate.month() : rand(0, 11),
    date: today ? todayDate.date() : rand(1, 27),
    hour: rand(0, 23),
    minute: rand(0, 60),
    second: 0,
    milliseconds: 0,
  };

  return moment().utc().set(timeObj).toISOString();
};

export const hash = () => {
  const buffer = crypto.pseudoRandomBytes(256);
  return crypto.createHash('sha1').update(buffer).digest('hex');
};

export const randomPassword = length => {
  const chars = 'abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890';
  let pass = '';
  for (let x = 0; x < length; x++) {
    const i = Math.floor(Math.random() * chars.length);
    pass += chars.charAt(i);
  }

  return pass;
};
