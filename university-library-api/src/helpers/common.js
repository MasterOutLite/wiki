export const wrapRoute = fn => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (e) {
    next(e);
  }
};

export const runCmd = async (callback = () => {}) => {
  try {
    await callback();
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

export const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};
