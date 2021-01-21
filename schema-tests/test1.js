const Ajv = require("ajv").default

const localize = require('ajv-i18n')

// format: 'email' ...
// format只对string和number有效

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      test: false,
      errorMessage: {
        type: '必须是字符串',
        test: '长度不能小于10'
      }
      // format: 'test'
    },
    age: {
      type: 'number'
    },
    pets: {
      type: 'array',
      items: [
        {
          type: 'string'
        },
        {
          type: 'number'
        }
      ]
    },
    isWorker: {
      type: 'boolean'
    }
  },
  required: ['name', 'age']
}

const ajv = new Ajv({ allErrors: true })
require("ajv-errors")(ajv)
// ajv.addFormat('test', data => {
//   console.log(data, '-------------')
//   return data === 'haha'
// })
ajv.addKeyword({
  keyword: "test",
  macro() {
    return {
      minLength: 10,
    }
  }
  // validate: function fun(schema, data) {
  //   fun.errors = [
  //     {
  //       keyword: 'test',
  //       dataPath: '/name',
  //       schemaPath: '#/properties/name/test',
  //       params: {},
  //       message: 'zidingyixinxi'
  //     }
  //   ]
  //   return false
  // },
  // errors: false,
})

// ajv.addKeyword({
//   keyword: "range",
//   type: "number",
//   compile([min, max], parentSchema) {
//     return parentSchema.exclusiveRange === true
//       ? (data) => data > min && data < max
//       : (data) => data >= min && data <= max
//   },
//   errors: false,
//   metaSchema: {
//     // schema to validate keyword value
//     type: "array",
//     items: [{ type: "number" }, { type: "number" }],
//     minItems: 2,
//     additionalItems: false,
//   },
// })
// ajv.addKeyword({
//   keyword: "range",
//   type: "number",
//   macro: ([minimum, maximum]) => ({ minimum, maximum }), // schema with keywords minimum and maximum
//   // metaSchema: the same as in the example above
// })
const validate = ajv.compile(schema)
const valid = validate({
  name: 'haha',
  age: 12
})
if (!valid) {
  localize.zh(validate.errors)
  console.log(validate.errors)
}
