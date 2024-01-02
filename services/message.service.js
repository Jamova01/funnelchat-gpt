const { models } = require("../libs/sequelize")
const boom = require("@hapi/boom")

const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

class MessagesService {
  constructor() { }

  async find(data) {
    try {
      const { threadId } = data
      const threadMessages = await openai.beta.threads.messages.list(threadId);
      return threadMessages
    } catch (error) {
      console.error(error);
    }
  }

  async create(data) {
    try {
      const { role, content, threadId } = data
      const threadMessages = await openai.beta.threads.messages.create(
        threadId,
        { role: role, content: content }
      );

      const newMessage = models.Message.create(
        {
          id: threadMessages.id,
          role: role,
          content: content,
          object: threadMessages.object,
          threadId: threadId,
          runId: threadMessages.run_id,
          assistantId: threadMessages.assistant_id,
          metadata: threadMessages.metadata,
        }
      )

      return newMessage
    } catch (error) {
      throw boom.badImplementation("Failed to create message", error);
    }
  }
}

module.exports = MessagesService
