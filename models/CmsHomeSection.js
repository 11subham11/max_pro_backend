// models/CmsHomeSection.js
module.exports = (sequelize, DataTypes) => {
  const CmsHomeSection = sequelize.define('CmsHomeSection', {
    section: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    content: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  }, {
    tableName: 'cms_home_sections',
    timestamps: true,
  });
  return CmsHomeSection;
};
