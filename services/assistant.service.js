const { models } = require("../libs/sequelize");
const boom = require("@hapi/boom");

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
    const newAssistant = await models.Assistant.create(data);
    return newAssistant;
  }

  async update(id, changes) {
    const assistant = await this.findOne(id);
    const updatedAssistant = await assistant.update(changes);
    return updatedAssistant;
  }

  async delete(id) {
    const assistant = await this.findOne(id);
    await assistant.destroy();
    return { id };
  }
}

module.exports = AssistantsService;
