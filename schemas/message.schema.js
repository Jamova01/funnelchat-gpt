const Joi = require('joi');

const createMessageSchema = Joi.object({
  openaiMessageId: Joi.string().required(),
  object: Joi.string().required(),
  createdAt: Joi.date().iso().required(),
  threadId: Joi.string().required(),
  role: Joi.string().required(),
  content: Joi.string().required(),
  fileIds: Joi.array().items(Joi.string()),
  assistantId: Joi.string().allow(null),
  runId: Joi.string().allow(null),
  metadata: Joi.object().allow(null),
});

module.exports = createMessageSchema;
