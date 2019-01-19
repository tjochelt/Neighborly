// module.exports = function(sequelize, DataTypes) {
//   var requested_task = sequelize.define("requested_task", {
//     title: DataTypes.STRING,
//     points: DataTypes.INTEGER,
//     taskStatus: DataTypes.INTEGER,
//     actionDate: DataTypes.DATE,
//     userId: DataTypes.INTEGER
//   });
//   return requested_task;
// };

module.exports = function(sequelize, DataTypes) {
  var Requested_task = sequelize.define("Requested_task", {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    // address: DataTypes.String,
    // points: DataTypes.INTEGER,
    taskStatus: DataTypes.BOOLEAN
  });

  Requested_task.associate = function(models) {
    // Requested task must belong to user
    //Setting user as foreign key
    Requested_task.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Requested_task;
};
