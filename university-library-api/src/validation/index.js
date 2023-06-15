import helpers from 'helpers';
import auth from 'validation/schemas/auth';
import user from 'validation/schemas/user';
import post from 'validation/schemas/post';

const validation = async function (value, schema, allowUnknown = true) {
  try {
    // abortEarly - when true, stops validation on the first error,
    // otherwise returns all the errors found. Defaults to true.
    // allowUnknown - when true, allows object to contain unknown keys which are ignored. Defaults to false.
    await schema.validateAsync(value, {abortEarly: false, allowUnknown});
  } catch (e) {
    throw new helpers.errors.Validation(e);
  }
};

export {auth, user, post};

export default validation;
