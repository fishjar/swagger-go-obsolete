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
      validate: {
        len: [3,20],
      }
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    good_time: {
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
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
      unique: false,
      validate: {
        min: 0.01,
        max: 200
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    homepage: {
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
    intro: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_good: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    my_extra: {
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
      underscored: true, // 下划线字段
      paranoid: true, // 软删除
      freezeTableName: true, // 禁用修改表名
      tableName: 'foo', // 定义表的名称
    });
  Foo.prototype.helloFun = () => `name: ${this.name}, age: ${this.status}`; // 自定义方法
  return Foo;
};
