module.exports = (sequelize, DataTypes) => {
  const Contacts = sequelize.define("Contacts", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Created_By: {
      type: DataTypes.STRING,
      defaultValue: "Vj_Consulting",
      allowNull: false,
    },
    Updated_By: {
      type: DataTypes.STRING,
      defaultValue: "Vj_Consulting",
      allowNull: false,
    },
  });
  return Contacts;
};
