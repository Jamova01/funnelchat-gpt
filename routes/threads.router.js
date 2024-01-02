const express = require('express');
const ThreadsService = require('../services/thread.service');
const validatorHandler = require('../middlewares/validator.handler');

const router = express.Router()
const service = new ThreadsService()

router.get("/", async (req, res, next) => {
  try {
    const threads = await service.find()
    res.json(threads)
  } catch (error) {
    next(error)
  }
})

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    const thread = await service.create(body)
    res.json(thread)
  } catch (error) {
    next(error)
  }
})

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    await service.delete(id)
    res.status(200).json({ id })
  } catch (error) {
    next(error)
  }
})

module.exports = router
