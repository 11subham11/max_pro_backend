module.exports = (sequelize, DataTypes) => {
  const All_Users = sequelize.define("All_Users", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "admin", "web"),
      allowNull: false,
      defaultValue: "user",
    },
    count: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      allowNull: true,
    },
    isDeleted: {
      type: DataTypes.INTEGER(1),
      defaultValue: 0,
      comment: "0 => active,  1 => deleted",
      allowNull: true,
    },
    isBlocked: {
      type: DataTypes.INTEGER(1),
      defaultValue: 0,
      comment: "0 => active,  1 => blocked",
      allowNull: true,
    },
    isConfirmed: {
      type: DataTypes.INTEGER(1),
      defaultValue: 1,
      comment: "0 => inactive,  1 => Confirmed",
      allowNull: true,
    },
    isSuspended: {
      type: DataTypes.INTEGER(1),
      defaultValue: 0,
      comment: "0 => active,  1 => Suspended",
      allowNull: true,
    },
    Created_By: {
      type: DataTypes.STRING,
      defaultValue: "Vj_Consulting",
      allowNull: true,
    },
    Updated_By: {
      type: DataTypes.STRING,
      defaultValue: "Vj_Consulting",
      allowNull: true,
    },
  });

  return All_Users;
};
