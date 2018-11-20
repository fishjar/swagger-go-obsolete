export default (sequelize, DataTypes) => {
  const Foo = sequelize.define('Foo', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: true,
      validate: {
        max: 100,
        min: 0,
      }
    },
  }, {
      // underscored: true,
      paranoid: true, // 软删除
      tableName: 'Foo',
    });
  Foo.prototype.helloFun = () => `name: ${this.name}, age: ${this.status}`;
  return Foo;
};
