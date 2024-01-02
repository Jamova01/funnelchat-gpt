const express = require('express');
const AssistantsService = require('../services/assistant.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createAssistantSchema, getAssistantSchema } = require('../schemas/assistants.schema');

const { OpenAI } = require("openai");

const router = express.Router();
const service = new AssistantsService();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

router.get('/', async (req, res, next) => {
  try {
    const assistants = await service.find();
    res.json(assistants);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const assistants = await service.findOne(id);
    res.json(assistants);
  } catch (error) {
    next(error);
  }
});

router.post('/', validatorHandler(createAssistantSchema, 'body'), async (req, res, next) => {
  try {
    const {
      userId,
      instructions,
      name,
      model,
      description,
      type,
      communicationType,
      company,
      site } = req.body

    const openAIData = {
      instructions: instructions,
      name: name,
      model: model,
    }

    const openAIResponse = await openai.beta.assistants.create(openAIData);

    const assistantData = {
      id: openAIResponse.id,
      userId: userId,
      name: name,
      description: description,
      type: type,
      communicationType: communicationType,
      company: company,
      site: site,
      model: model,
      instructions: instructions,
    };

    const newAssistant = await service.create(assistantData);

    res.status(201).json(newAssistant);
  } catch (error) {
    console.error('Error creating assistant:', error);
    res.status(400).json({ error: 'Failed to create assistant', details: error.message });
  }
});

router.delete('/:id', validatorHandler(getAssistantSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.status(204).json({ id });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', validatorHandler(getAssistantSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedAssistant = await service.update(id, req.body);
    res.json(updatedAssistant);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
