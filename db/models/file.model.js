const { Model, DataTypes, Sequelize } = require("sequelize");
const { ASSISTANT_TABLE } = require("./assistant.model");

const FILE_TABLE = "files"

const FileSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
  },
  path: {
    allowNull: false,
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
    onDelete: "CASCADE",
  },
  createdAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: "created_at",
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: "updated_at",
    defaultValue: Sequelize.NOW,
  },
}

class File extends Model {

  static associate(models) {
    // this.belongsTo(models.Assistant, { as: "assistant" });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: FILE_TABLE,
      modelName: 'File',
      timestamps: true,
    };
  }
}

module.exports = { FILE_TABLE, FileSchema, File }
