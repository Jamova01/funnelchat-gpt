const { Model, DataTypes, Sequelize } = require("sequelize");
const { THREAD_TABLE } = require("./thread.model");

const MESSAGE_TABLE = "messages";

const MessageSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  content: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  object: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  threadId: {
    allowNull: false,
    type: DataTypes.STRING,
    field: "thread_id",
    references: {
      model: THREAD_TABLE,
      key: "id"
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  fileIds: {
    allowNull: true,
    type: DataTypes.ARRAY(DataTypes.STRING),
    field: "file_ids"
  },
  assistantId: {
    allowNull: true,
    type: DataTypes.STRING,
    field: "assistant_id"
  },
  runId: {
    allowNull: true,
    type: DataTypes.STRING,
    field: "run_id"
  },
  metadata: {
    allowNull: true,
    type: DataTypes.JSONB,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "created_at",
    defaultValue: Sequelize.NOW,
  },
};

class Message extends Model {
  static associate(models) {
    this.belongsTo(models.Thread, { as: 'thread' });
    this.belongsTo(models.Run, { as: 'run', foreignKey: 'runId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: MESSAGE_TABLE,
      modelName: "Message",
      timestamps: false,
    };
  }
}

module.exports = { MESSAGE_TABLE, MessageSchema, Message };
