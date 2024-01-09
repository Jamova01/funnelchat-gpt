const express = require('express');
const MessagesService = require("../services/message.service")

const router = express.Router()
const service = new MessagesService()

router.get("/", async (req, res, next) => {
  try {
    const body = req.body
    const threadMessages = await service.find(body)
    res.json(threadMessages)
  } catch (error) {

  }
})

router.post("/", async (req, res, next) => {
  try {
    const body = req.body
    const message = await service.create(body)
    res.status(200).json(message)
  } catch (error) {
    next(error)
  }
})

module.exports = router
