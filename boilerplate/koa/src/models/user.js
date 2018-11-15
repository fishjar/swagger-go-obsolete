export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    age: {
      type: DataTypes.TINYINT,
      allowNull: true,
      validate: {
        max: 100,
        min: 1,
      }
    },
  });
  User.prototype.helloFun = () => `name: ${this.username}, age: ${this.age}`;
  return User;
};
