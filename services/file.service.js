const { models } = require("../libs/sequelize")
const boom = require("@hapi/boom")
const fs = require("fs")

const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

class FilesService {
  constructor() { }

  async find() {
    const response = models.File.findAll()
    return response
  }

  async findOne(id) {
    const file = await models.File.findByPk(id)

    if (!file) {
      throw boom.notFound("File not found")
    }

    return file
  }

  async create(data) {

    const { path, assistantId } = data

    const openAIData = {
      file: fs.createReadStream(path),
      purpose: "assistants",
    }

    const file = await openai.files.create(openAIData);

    const newFile = models.File.create({
      id: file.id,
      path: file.filename,
      assistantId: assistantId // Eliminar esta columna
    })

    return newFile
  }

  async delete(id) {
    const file = await this.findOne(id)
    await file.destroy()

    return { id }
  }
}

module.exports = FilesService
