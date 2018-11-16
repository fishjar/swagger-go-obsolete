export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userStatus: {
      type: DataTypes.TINYINT,
      allowNull: true,
      validate: {
        max: 100,
        min: 0,
      }
    },
  }, {
      underscored: true,
      tableName: 'User',
    });
  User.prototype.helloFun = () => `name: ${this.username}, age: ${this.age}`;
  return User;
};
