const { models } = require("../libs/sequelize")
const boom = require("@hapi/boom")

const { OpenAI } = require("openai")

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

class AssistantsService {
  constructor() { }

  async find() {
    const assistants = await models.Assistant.findAll({
      include: ["threads"]
    });

    return assistants;
  }

  async findOne(id) {
    const assistant = await models.Assistant.findByPk(id);
    if (!assistant) {
      throw boom.notFound("Assistant not found");
    }
    return assistant;
  }

  async create(data) {
    const {
      userId,
      instructions,
      name,
      model,
      description,
      type,
      communicationType,
      company,
      site,
      fileIds,
      tools,
    } = data;

    try {
      const openAIData = {
        name: name,
        instructions: instructions,
        description: description,
        model: model,
        tools: tools,
        file_ids: fileIds,
      };

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
        fileIds: fileIds,
      };

      const newAssistant = await models.Assistant.create(assistantData);

      return newAssistant;
    } catch (error) {
      throw boom.badImplementation("Failed to create assistant", error);
    }
  }

  async update(id, changes) {
    const assistant = await this.findOne(id);
    const updatedAssistant = await assistant.update(changes);
    return updatedAssistant;
  }

  async delete(id) {
    const assistant = await this.findOne(id);
    try {
      await openai.beta.assistants.del(assistant.id);
      await assistant.destroy();
      return { id };
    } catch (error) {
      throw boom.badImplementation("Failed to delete assistant", error);
    }
  }

}

module.exports = AssistantsService;
