import joi from 'joi';
import {email} from 'validation/schemas/rules';

const login = joi
  .object()
  .keys({
    email,
    password: joi.string().min(6).max(255),
  })
  .with('email', 'password');

export default {
  login,
};
