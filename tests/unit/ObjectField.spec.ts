import { mount } from '@vue/test-utils'
import JsonSchemaForm, { NumberField, StringField } from '../../lib'

describe('ObjectField', () => {
  let schema: any
  // 多个测试用例的公共变量写在beforeEach里面进行初始化。
  beforeEach(() => {
    schema = {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        age: {
          type: 'number',
        },
      },
    }
  })

  // 测试ObjectField是否能正确渲染出子组件
  it('should render properties to correct fields', async () => {
    let value: any = {}
    const wrapper = mount(JsonSchemaForm, {
      props: {
        schema,
        value: value,
        onChange: v => {
          value = v
        },
      },
    })

    const strField = wrapper.findComponent(StringField)
    const numField = wrapper.findComponent(NumberField)

    expect(strField.exists()).toBeTruthy()
    expect(numField.exists()).toBeTruthy()
  })

  // 测试子组件触发onChange事件后，ObjectField的值是否改变
  it('should change value when sub fields trigger onChange', async () => {
    let value: any = {}
    const wrapper = mount(JsonSchemaForm, {
      props: {
        schema,
        value: value,
        onChange: v => {
          value = v
        },
      },
    })

    const strField = wrapper.findComponent(StringField)
    const numField = wrapper.findComponent(NumberField)

    // 手动调用onChange，注意是异步的
    await strField.props('onChange')('1')
    expect(value.name).toEqual('1')
    await numField.props('onChange')(2)
    expect(value.age).toEqual(2)
  })

  // 为了提高测试覆盖率，测试子组件onChange改变的值是undefined时，ObjectField的value是否正确
  it('should property be undefined when sub field trigger onChange(undefined)', async () => {
    let value: any = {}
    const wrapper = mount(JsonSchemaForm, {
      props: {
        schema,
        value: value,
        onChange: v => {
          value = v
        },
      },
    })

    const strField = wrapper.findComponent(StringField)

    await strField.props('onChange')(undefined)
    expect(value.name).toBeUndefined()
  })

  it('should value be blank object when value type is not an object', async () => {
    let value: any = 123
    const wrapper = mount(JsonSchemaForm, {
      props: {
        schema,
        value: value,
        onChange: v => {
          value = v
        },
      },
    })

    const strField = wrapper.findComponent(StringField)
    await strField.props('onChange')('foo')
    expect(value).toEqual({ name: 'foo' })
  })
})
