const Joi = require('joi');

const createRunSchema = Joi.object({
  threadId: Joi.string().required(),
  assistantId: Joi.string().required(),
});

const getRunSchema = Joi.object({
  threadId: Joi.string().required(),
})

module.exports = { createRunSchema, getRunSchema }
