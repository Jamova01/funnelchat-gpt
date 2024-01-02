const { models } = require("../libs/sequelize")
const boom = require("@hapi/boom")

const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

class ThreadsService {
  constructor() { }

  async find() {
    const response = await models.Thread.findAll({
      include: [
        { model: models.Message, as: "messages" },
        { model: models.Run, as: "runs" }
      ]
    });

    return response
  }

  async findOne(id) {
    const thread = await models.Thread.findByPk(id)

    if (!thread) {
      throw boom.notFound("thread not found")
    }

    return thread
  }

  async create(data) {
    try {
      const { assistantId } = data

      const emptyThread = await openai.beta.threads.create();

      const newThread = await models.Thread.create({
        id: emptyThread.id,
        assistantId: assistantId
      });

      return newThread;
    } catch (error) {
      throw boom.badImplementation("Failed to create thread", error);
    }
  }

  async delete(id) {
    try {
      const thread = await this.findOne(id);

      await openai.beta.threads.del(thread.id);

      await thread.destroy();

      return { id };
    } catch (error) {
      throw boom.badImplementation("Failed to delete thread", error);
    }
  }
}

module.exports = ThreadsService
