// module.exports = function(sequelize, DataTypes) {
//   var user = sequelize.define("user", {
//     // userId: DataTypes.INTEGER,
//     username: DataTypes.STRING,

//     email: DataTypes.STRING,
//     password: DataTypes.STRING
//   });
//   return user;
// };

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  });
  user.associate = function(models) {
    // Associating user with requested tasks
    // When user is deleted, also delete any associated Posts
    user.hasMany(models.Requested_task, {
      onDelete: "cascade"
    });
  };

  return user;
};
