const { User, UserSchema } = require("./user.model")
const { Assistant, AssistantSchema } = require("./assistant.model")
const { Thread, ThreadsSchema } = require("./thread.model")
const { Message, MessageSchema } = require("./message.model")
const { Run, RunSchema } = require("./run.model")
const { File, FileSchema } = require("./file.model")

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize))
  Assistant.init(AssistantSchema, Assistant.config(sequelize))
  Thread.init(ThreadsSchema, Thread.config(sequelize))
  Message.init(MessageSchema, Message.config(sequelize))
  Run.init(RunSchema, Run.config(sequelize))
  File.init(FileSchema, File.config(sequelize))

  User.associate(sequelize.models)
  Assistant.associate(sequelize.models)
  Thread.associate(sequelize.models)
  Message.associate(sequelize.models)
  Run.associate(sequelize.models)
}

module.exports = setupModels
