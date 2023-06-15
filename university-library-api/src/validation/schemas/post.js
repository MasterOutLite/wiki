import joi from 'joi';

const createPost = joi.object().keys({
  name: joi.string().max(255).required(),
  description: joi.string().required(),
  userId: joi.number().integer(),
});

const updatePost = joi.object().keys({
  name: joi.string().max(255),
  description: joi.string(),
});

export default {
  createPost,
  updatePost,
};
