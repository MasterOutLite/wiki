export const isEmpty = value => {
  try {
    return (
      value === undefined ||
      value === '' ||
      value === null ||
      JSON.stringify(value) === JSON.stringify({}) ||
      value.length === 0
    );
  } catch (e) {
    return false;
  }
};

export const isEmail = value =>
  !!value.match(
    // eslint-disable-next-line max-len
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

export const isNumber = value => {
  const result = !Number.isNaN(parseFloat(value)) && Number.isFinite(parseFloat(value));
  if (result) {
    return String(parseFloat(value)).length === String(value).length;
  }

  return false;
};

export const isObject = value => typeof value === 'object' && value !== null;

export const isString = value => typeof value === 'string' || value instanceof String;

export const isUrl = value => {
  try {
    const url = new URL(value);
    return !!url;
  } catch (e) {
    return false;
  }
};

export const isArray = value => Array.isArray(value);

