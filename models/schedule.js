'use strict';
module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define('Schedule', {
    name: DataTypes.STRING,
    event: DataTypes.STRING,
    date: DataTypes.INTEGER
  }, {});
  Schedule.associate = function(models) {
    // associations can be defined here
    Schedule.belogsTo(models.users);
  };
  return Schedule;
};