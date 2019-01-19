module.exports = function(sequelize, DataTypes) {
    var score = sequelize.define("score", {
      userId: DataTypes.INTEGER,
      points: DataTypes.INTEGER
    });
    return score;
  };