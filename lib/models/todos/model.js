'use strict';

const todoModel = (sequelize, DataTypes) => sequelize.define('Food', {
  text: { type: DataTypes.STRING, required: true },
  difficulty: { type: DataTypes.NUMBER, required: true },
  assignee: { type: DataTypes.STRING, required: true },
  complete: { type: DataTypes.BOOLEAN, required: true}
});

module.exports = todoModel;