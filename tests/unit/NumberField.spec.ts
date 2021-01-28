import { mount } from '@vue/test-utils'
import { NumberField } from '../../lib'
import TestComponent from './utils/TestComponent'

describe('JsonSchemaForm', () => {
  it('should render correct number field', async () => {
    let value = ''
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: 'number',
        },
        value,
        onChange: v => {
          value = v
        },
      },
    })
    const numberField = wrapper.findComponent(NumberField)
    expect(numberField.exists()).toBeTruthy()
    // 直接触发numberField接收的onChange事件，即wrapper上面的onChange，这样是不全面的，没有测试numberField内部的实现
    // await numberField.props('onChange')('123')
    // expect(value).toBe('123')\

    // 触发numberField内部input输入框的input事件，进而触发外部传入的onChange事件，改变上面声明的value
    const input = numberField.find('input')
    input.element.value = '123'
    input.trigger('input')
    // 传入的是字符串'123'，期望得到的是数字 123，这正是numberField组件做的事情
    expect(value).toBe(123)
  })
})
