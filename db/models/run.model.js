const { Model, DataTypes, Sequelize } = require("sequelize");

const RUN_TABLE = "runs";

const RunSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
  },
  assistantId: {
    allowNull: false,
    type: DataTypes.STRING,
    field: "assistant_id",
  },
  threadId: {
    allowNull: false,
    type: DataTypes.STRING,
    field: "thread_id",
  },
  status: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  object: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  startedAt: {
    allowNull: true,
    type: DataTypes.INTEGER,
    field: "started_at",
  },
  expiresAt: {
    allowNull: true,
    type: DataTypes.INTEGER,
    field: "expires_at",
  },
  cancelledAt: {
    allowNull: true,
    type: DataTypes.INTEGER,
    field: "cancelled_at",
  },
  completedAt: {
    allowNull: true,
    type: DataTypes.INTEGER,
    field: "completed_at",
  },
  failedAt: {
    allowNull: true,
    type: DataTypes.INTEGER,
    field: "failed_at",
  },
  lastError: {
    allowNull: true,
    type: DataTypes.JSONB,
    field: "last_error",
  },
  tools: {
    allowNull: true,
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  fileIds: {
    allowNull: true,
    type: DataTypes.ARRAY(DataTypes.STRING),
    field: "file_ids",
  },
  model: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  instructions: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  metadata: {
    allowNull: false,
    type: DataTypes.JSONB,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "created_at",
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "updated_at",
    defaultValue: Sequelize.NOW,
  },
};

class Run extends Model {
  static associate(models) {
    this.belongsTo(models.Thread, { as: 'thread' });
    this.hasMany(models.Message, { foreignKey: 'runId', as: 'messages' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: RUN_TABLE,
      modelName: "Run",
      timestamps: true,
    };
  }
}

module.exports = { RUN_TABLE, RunSchema, Run };
