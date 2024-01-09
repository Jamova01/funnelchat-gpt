const express = require('express');
const AssistantsService = require('../services/assistant.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createAssistantSchema, getAssistantSchema } = require('../schemas/assistants.schema');

const router = express.Router();
const service = new AssistantsService();

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
    const body = req.body
    const newAssistant = await service.create(body);
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
