const Joi = require('joi');

const id = Joi.number().integer();
const stringLimited = (maxLength) => Joi.string().max(maxLength);
const enumValues = (values) => Joi.string().valid(...values);

const createAssistantSchema = Joi.object({
  name: Joi.string().max(255).required(),
  description: Joi.string().max(500).required(),
  type: Joi.string().valid('Support', 'Sales').required(),
  communicationType: Joi.string().max(255).optional(),
  company: Joi.string().max(50).optional(),
  site: Joi.string().max(50).optional(),
  model: Joi.string().valid('gpt-3.5-turbo', 'gpt-3.5-turbo-1106', 'gpt-3.5-turbo-16k').required(),
  instructions: Joi.string().max(1500).optional(),
  userId: id.required(),
  tools: Joi.array().items(
    Joi.object({
      type: Joi.string().valid('code_interpreter', 'retrieval', 'function').required()
    })
  ).max(128).optional(),
  instructions: Joi.string().max(32768).optional(),
  fileIds: Joi.array().items(Joi.string()),
});

const updateAssistantSchema = Joi.object({
  name: stringLimited(255),
  description: stringLimited(500),
  type: enumValues(['Support', 'Sales']),
  communicationType: stringLimited(255),
  company: stringLimited(50),
  site: stringLimited(50),
  model: Joi.string().valid('gpt-3.5-turbo', 'gpt-3.5-turbo-1106', 'gpt-3.5-turbo-16k'),
  instructions: stringLimited(1500),
});

const getAssistantSchema = Joi.object({
  id: Joi.string().required(),
});

module.exports = { createAssistantSchema, updateAssistantSchema, getAssistantSchema };
