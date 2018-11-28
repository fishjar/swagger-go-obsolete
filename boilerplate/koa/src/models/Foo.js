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
      // defaultValue: null,
    },
    birthDay: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    goodTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    age: {
      type: DataTypes.TINYINT,
      allowNull: true,
      validate: {
        max: 100,
        min: 0,
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    homePage: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    notice: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isGood: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    myExtra: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    status: {
      type: DataTypes.TINYINT,
      validate: {
        isIn: [[1, 2, 3]],
      },
      allowNull: false,
    },
  }, {
      // underscored: true, // 下划线字段
      paranoid: true, // 软删除
      tableName: 'Foo',
    });
  Foo.prototype.helloFun = () => `name: ${this.name}, age: ${this.status}`;
  return Foo;
};
