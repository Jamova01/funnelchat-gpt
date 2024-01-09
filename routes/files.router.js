const express = require("express")
const FilesService = require("../services/file.service");
const validatorHandler = require('../middlewares/validator.handler');
const { createFileSchema, getFileSchema } = require("../schemas/file.schema")
const fs = require("fs")

const router = express.Router()
const service = new FilesService

const { OpenAI } = require("openai")

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

router.get("/", async (req, res, next) => {
  try {
    const files = await service.find()
    res.json(files)
  } catch (error) {
    next(error)
  }
})

router.get("/:id", validatorHandler(getFileSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params
    const file = await service.findOne(id)
    res.json(file)
  } catch (error) {
    next(error)
  }
})

router.post('/', validatorHandler(createFileSchema, 'body'), async (req, res, next) => {
  try {
    const body = req.body
    const newFile = await service.create(body)
    res.status(201).json(newFile)
  } catch (error) {
    console.error('Error creating file:', error);
    res.status(400).json({ error: 'Failed to create file', details: error.message });
  }
});

router.delete('/:id', validatorHandler(getFileSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.status(204).json({ id });
  } catch (error) {
    next(error);
  }
});

module.exports = router
