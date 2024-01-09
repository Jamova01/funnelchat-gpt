const { models } = require("../libs/sequelize")
const boom = require("@hapi/boom")

const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

class RunsService {
  constructor() { }

  async find(data) {
    try {
      const { threadId } = data
      const runs = await openai.beta.threads.runs.list(
        threadId
      );
      return runs;
    } catch (error) {
      throw boom.badImplementation("Failed to fetch runs", error);
    }
  }

  async create(data) {
    try {
      const { threadId, assistantId } = data

      const run = await openai.beta.threads.runs.create(threadId, {
        assistant_id: assistantId
      })

      const newRun = await models.Run.create({
        id: run.id,
        assistantId: run.assistant_id,
        threadId: run.thread_id,
        status: run.status,
        object: run.object,
        startedAt: run.started_at,
        expiresAt: run.expires_at,
        cancelledAt: run.cancelled_at,
        completedAt: run.completed_at,
        failedAt: run.failed_at,
        lastError: run.last_error,
        tools: run.tools,
        fileIds: run.file_ids,
        model: run.model,
        instructions: run.instructions,
        metadata: run.metadata,
      });

      return newRun
    } catch (error) {
      throw boom.badImplementation("Failed to create run", error);
    }
  }
}

module.exports = RunsService
