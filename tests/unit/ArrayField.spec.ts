import { mount } from '@vue/test-utils'

import TestComponent from './utils/TestComponent'

import {
  NumberField,
  StringField,
  SelectionWidget,
  ArrayField,
} from '../../lib'

describe('ArrayField', () => {
  // 测试是否正确渲染多类型数组
  it('should render multi type', () => {
    let value: any = []
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: 'array',
          items: [{ type: 'string' }, { type: 'number' }],
        },
        value,
        onChange: v => {
          value = v
        },
      },
    })

    const arr = wrapper.findComponent(ArrayField)
    const str = arr.findComponent(StringField)
    const num = arr.findComponent(NumberField)

    expect(str.exists()).toBeTruthy()
    expect(num.exists()).toBeTruthy()
  })

  // 测试是否正确渲染单类型数组
  it('should render single type', () => {
    let value: any = ['1', '2']
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: 'array',
          items: [{ type: 'string' }, { type: 'string' }],
        },
        value,
        onChange: v => {
          value = v
        },
      },
    })

    const arr = wrapper.findComponent(ArrayField)
    const strs = arr.findAllComponents(StringField)

    expect(strs.length).toBe(2)
    expect(strs[0].props('value')).toBe('1')
  })

  // 测试多可选 数组
  it('should render multi-select type', () => {
    let value: any = []
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: 'array',
          items: { type: 'string', enum: ['foo', 'bar', 'baz'] },
        },
        value: value,
        onChange: v => {
          value = v
        },
      },
    })

    const arr = wrapper.findComponent(ArrayField)
    const select = arr.findComponent(SelectionWidget)

    expect(select.exists()).toBeTruthy()
  })
})
