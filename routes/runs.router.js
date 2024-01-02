const express = require('express');
const RunsService = require("../services/run.service")
const validatorHandler = require('../middlewares/validator.handler');
const { createRunSchema, getRunSchema } = require('../schemas/run.schema');

const router = express.Router()
const service = new RunsService()

router.get("/", validatorHandler(getRunSchema), async (req, res, next) => {
  try {
    const body = req.body
    const runs = await service.find(body)
    res.json(runs)
  } catch (error) {
    res.status(400).json({ error: 'Failed to get runs', details: error.message })
    next(error)
  }
})

router.post("/", validatorHandler(createRunSchema), async (req, res, next) => {
  try {
    const body = req.body
    const newRun = await service.create(body)
    res.status(201).json(newRun)
  } catch (error) {
    console.error('Error creating run:', error);
    res.status(400).json({ error: 'Failed to create run', details: error.message })
    next(error)
  }
})

module.exports = router;
