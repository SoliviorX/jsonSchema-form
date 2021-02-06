import PasswordWidget from '../components/PasswordWidget'

export default {
  name: 'demo',
  schema: {
    type: 'object',
    properties: {
      pass1: {
        type: 'string',
        // minLength: 10,
        test: true, // 自定义keyword——test
        title: 'password',
      },
      pass2: {
        type: 'string',
        minLength: 10,
        title: 'retry password',
      },
      // 自定义format
      color: {
        type: 'string',
        format: 'color',
        title: 'Input Color',
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
  uiSchema: {
    properties: {
      pass1: {
        widget: PasswordWidget,
      },
      pass2: {
        color: 'red',
      },
    },
  },
  default: 12123,
}
