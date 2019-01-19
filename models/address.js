module.exports = function (sequelize, DataTypes) {
  var address = sequelize.define("address", {
    mapsCoords: DataTypes.DECIMAL,
    longAddress: DataTypes.STRING
  });
  return address;
};