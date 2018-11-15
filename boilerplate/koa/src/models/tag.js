export default (sequelize, DataTypes) => {
  const Tag = sequelize.define('tag', {
    title: DataTypes.STRING
  })
  return Tag
};