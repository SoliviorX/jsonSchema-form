import { defineComponent } from 'vue'
import { CommonWidgetPropsDefine, CommonWidgetDefine } from '../types'
import { withFormItem } from './FormItem'

// 这里必须要指定NumberWidget的类型CommonWidgetDefine（SelectionWidget、TextWidget同理）
// 虽然CommonWidgetDefine也是通过CommonWidgetPropsDefine来定义的，但是如果不指定它的类型，defineComponent返回的组件类型是和CommonWidgetDefine不一样的
const NumberWidget: CommonWidgetDefine = withFormItem(
  defineComponent({
    name: 'NumberWidget',
    props: CommonWidgetPropsDefine,
    setup(props) {
      const handleChange = (e: any) => {
        const v = e.target.value
        e.target.value = props.value
        const value = Number(v)
        Number.isNaN(value) ? props.onChange(undefined) : props.onChange(value)
      }
      return () => {
        const { value } = props
        return (
          <input type="number" value={value as any} onInput={handleChange} />
        )
      }
    },
  }),
)

export default NumberWidget
