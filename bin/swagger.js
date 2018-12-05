const path = require('path');
const fs = require('fs-extra')
const yaml = require('js-yaml');

const { YAML_FILE, ROOT_PATH, DIST_PATH } = require('../config');

try {
  const doc = yaml.safeLoad(fs.readFileSync(YAML_FILE, 'utf8'));
  // console.log(doc)

  const paths = {};

  Object.entries(doc.definitions)
    .filter(([_, model]) => model['x-isModel'])
    .forEach(([modelKey, model], index) => {
      const _plural = model['x-plural'].toLowerCase();
      const modelName = model['description'];
      console.log(`模型${index + 1}: ${modelName}`);

      paths[`/${_plural}`] = {
        post: {
          summary: `创建单个${modelName}`,
          description: `创建单个${modelName}...`,
          parameters: [{
            in: "body",
            name: "body",
            description: "模型参数",
            required: true,
            schema: {
              "$ref": `#/definitions/${modelKey}`,
            }
          }],
          responses: {
            "200": {
              description: "创建成功",
            }
          }
        },
        get: {
          summary: `查询多个${modelName}`,
          description: `查询多个${modelName}...`,
          parameters: [{
            in: "query",
            name: "pageNum",
            type: "integer",
            description: "页码",
            default: 1,
          }, {
            in: "query",
            name: "pageSize",
            type: "integer",
            description: "分页大小",
            default: 10,
          }, {
            in: "query",
            name: "sorter",
            type: "string",
            description: "排序",
          }],
          responses: {
            "200": {
              description: "查询成功",
              schema: {
                type: "object",
                properties: {
                  count: {
                    type: "integer",
                  },
                  rows: {
                    type: "array",
                    items: {
                      "$ref": `#/definitions/${modelKey}`,
                    }
                  }
                }
              }
            }
          }
        },
        patch: {
          summary: `更新多个${modelName}`,
          description: `更新多个${modelName}...`,
          parameters: [{
            in: "body",
            name: "body",
            description: "body参数",
            schema: {
              type: "array",
              items: {
                "$ref": `#/definitions/${modelKey}`
              }
            }
          }],
          responses: {
            "200": {
              description: "更新成功",
            }
          }
        },
        delete: {
          summary: `删除多个${modelName}`,
          description: `删除多个${modelName}...`,
          parameters: [{
            in: "body",
            name: "body",
            description: "body参数",
            schema: {
              type: "object",
              example: {
                id: ["1", "2"],
              }
            }
          }],
          responses: {
            "200": {
              description: "更新成功",
            }
          }
        }
      };
      paths[`/${_plural}/{id}`] = {
        get: {
          summary: `查询单个${modelName}`,
          description: `查询单个${modelName}..`,
          parameters: [{
            in: "path",
            name: "id",
            type: "string",
            required: true,
            description: "ID",
          }],
          responses: {
            "200": {
              description: "查询成功",
              schema: {
                "$ref": `#/definitions/${modelKey}`
              }
            }
          }
        },
        patch: {
          summary: `修改单个${modelName}`,
          description: `修改单个${modelName}..`,
          parameters: [{
            in: "path",
            name: "id",
            type: "string",
            required: true,
            description: "ID",
          }, {
            in: "body",
            name: "body",
            description: "模型参数",
            required: true,
            schema: {
              "$ref": `#/definitions/${modelKey}`
            }
          }],
          responses: {
            "200": {
              description: "修改成功",
            }
          }
        },
        delete: {
          summary: `删除单个${modelName}`,
          description: `删除单个${modelName}..`,
          parameters: [{
            in: "path",
            name: "id",
            type: "string",
            required: true,
            description: "ID",
          }],
          responses: {
            "200": {
              description: "删除成功"
            }
          }
        }
      };
      paths[`/${_plural}/multiple`] = {
        post: {
          summary: `创建多个${modelName}`,
          description: `创建多个${modelName}...`,
          parameters: [{
            in: "body",
            name: "body",
            description: "body参数",
            schema: {
              type: "array",
              items: {
                "$ref": `#/definitions/${modelKey}`
              }
            }
          }],
          responses: {
            "200": {
              description: "创建成功"
            }
          }
        }
      };

    });

  // 创建文件夹
  fs.ensureDirSync(path.join(DIST_PATH, 'swagger'));
  const outFile = path.join(DIST_PATH, 'swagger', 'swagger.yaml');
  const outData = yaml.dump({ ...doc, paths, });
  // 保存文件
  console.log(`\n创建: ${outFile}`);
  fs.writeFileSync(outFile, outData, 'utf8');
  console.log('\n执行成功！')
} catch (err) {
  console.log(err)
}
