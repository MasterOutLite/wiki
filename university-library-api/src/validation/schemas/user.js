import joi from 'joi';
import USER from 'constants/user';
import {email} from 'validation/schemas/rules';

const base = joi.object().keys({
  firstName: joi.string().max(255).required(),
  lastName: joi.string().max(255).required(),
});

const createUser = base.keys({
  email,
  userRoleId: joi.number().integer().valid(USER.roles.member.id, USER.roles.admin.id).required(),
});

const updateUser = base;

const updateUserRole = joi.object().keys({
  userRoleId: joi.number().integer().valid(USER.roles.member.id, USER.roles.admin.id).required(),
});

export default {
  createUser,
  updateUser,
  updateUserRole,
};
