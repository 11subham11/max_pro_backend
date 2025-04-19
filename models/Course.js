// models/Course.js
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    chapters: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  }, {
    tableName: 'courses',
    timestamps: true,
  });
  return Course;
};
