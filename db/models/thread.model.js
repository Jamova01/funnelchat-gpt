const { Model, DataTypes, Sequelize } = require("sequelize")
const { ASSISTANT_TABLE } = require("./assistant.model")

const THREAD_TABLE = "threads"

const ThreadsSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
  },
  assistantId: {
    field: "assistant_id",
    allowNull: true,
    type: DataTypes.STRING,
    references: {
      model: ASSISTANT_TABLE,
      key: "id"
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "created_at",
    defaultValue: Sequelize.NOW
  },
}

class Thread extends Model {
  static associate(models) {
    this.belongsTo(models.Assistant, { as: 'assistant' });
    this.hasMany(models.Message, { as: 'messages', foreignKey: 'threadId' });
    this.hasMany(models.Run, { as: 'runs', foreignKey: 'threadId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: THREAD_TABLE,
      modelName: 'Thread',
      timestamps: false,
    }
  }
}

module.exports = { THREAD_TABLE, ThreadsSchema, Thread }
