"use strict";
import { Model, UUIDV4 } from "sequelize";

interface ProjectAttributes {
  id: number;
  name: string;
  status: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Project extends Model<ProjectAttributes> implements ProjectAttributes {
    id!: number;
    name!: string;
    status!: string;
    static associate(models: any) {
      Project.belongsToMany(models.User, {
        through: "ProjectAssignments",
      });
    }
  }
  Project.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Project",
    }
  );
  return Project;
};
