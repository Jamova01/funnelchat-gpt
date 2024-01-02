const express = require("express")

const usersRouter = require("./users.router")
const assistantsRouter = require("./assistants.router")
const threadsRouter = require("./threads.router")
const messagesRouter = require("./messages.router")
const runsRouter = require("./runs.router")
// const openaiRouter = require("./openai.router")
// const filesRouter = require("./files.router")

function routerApi(app) {
  const router = express.Router()
  app.use("/api/v1", router)

  router.use("/users", usersRouter)
  router.use("/assistants", assistantsRouter)
  router.use("/threads", threadsRouter)
  router.use("/messages", messagesRouter)
  router.use("/runs", runsRouter)
  // router.use("/files", filesRouter)
  // router.use("/openai-request", openaiRouter)
}

module.exports = routerApi
