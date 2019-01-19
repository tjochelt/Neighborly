module.exports = function(sequelize, DataTypes) {
    var type = sequelize.define("type", {
      taskType: DataTypes.INTEGER,
      taskTitle: DataTypes.STRING,
      taskDescr: DataTypes.STRING,
      taskPoints: DataTypes.INTEGER
    });
    return type;
  };