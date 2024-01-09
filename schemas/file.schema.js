const Joi = require('joi');

const createFileSchema = Joi.object({
  path: Joi.string().required(),
  assistantId: Joi.number().integer(),
});

const updateFileSchema = Joi.object({
  path: Joi.string().required(),
  assistantId: Joi.number().integer(),
});

const getFileSchema = Joi.object({
  id: Joi.number().integer()
})

module.exports = { createFileSchema, updateFileSchema, getFileSchema };
