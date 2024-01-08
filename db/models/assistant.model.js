const { Model, DataTypes, Sequelize } = require("sequelize");
const { USER_TABLE } = require("./user.model");

const ASSISTANT_TABLE = "assistants";

const AssistantSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(255),
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING(500),
  },
  type: { // This field refers to: Support or Sales.
    allowNull: false,
    type: DataTypes.STRING,
  },
  communicationType: {
    allowNull: true,
    field: "communication_type",
    type: DataTypes.STRING,
  },
  company: {
    allowNull: true,
    type: DataTypes.STRING(50),
  },
  site: {
    allowNull: true,
    type: DataTypes.STRING(50),
  },
  model: {
    allowNull: false,
    type: DataTypes.STRING
  },
  instructions: {
    allowNull: true,
    type: DataTypes.STRING(1500),
  },
  fileIds: {
    allowNull: true,
    field: "file_ids",
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  userId: {
    field: "user_id",
    allowNull: "false",
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: "id"
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
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

class Assistant extends Model {

  static associate(models) {
    this.belongsTo(models.User, { as: "user" })
    this.hasMany(models.Thread, { foreignKey: 'assistantId', as: 'threads' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ASSISTANT_TABLE,
      modelName: 'Assistant',
      timestamps: true,
      underscored: true,
      freezeTableName: true,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    };
  }
}

module.exports = { ASSISTANT_TABLE, AssistantSchema, Assistant };
