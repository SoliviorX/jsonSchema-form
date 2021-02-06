export default {
  name: 'demo',
  schema: {
    type: 'object',
    properties: {
      pass1: {
        type: 'string',
        minLength: 10,
        title: 'password',
      },
      pass2: {
        type: 'string',
        minLength: 10,
        title: 'retry password',
      },
    },
  },
  async customValidate(data: any, errors: any) {
    return new Promise((resolve: (value?: any) => void) => {
      setTimeout(() => {
        if (data.pass1 !== data.pass2) {
          errors.pass2.addError('密码必须相同')
        }
        resolve()
      }, 2000)
    })
  },
  uiSchema: {},
  default: 12123,
}
