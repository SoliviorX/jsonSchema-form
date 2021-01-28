import { defineComponent } from 'vue'
import { FieldPropsDefine, CommonWidgetDefine } from '../types'
import { getWidget } from '../theme'

export default defineComponent({
  name: 'NumberField',
  props: FieldPropsDefine,
  setup(props) {
    const handleChange = (v: any) => {
      // const value = Number(v.target.value)
      props.onChange(v)
    }
    const NumberWidgetRef = getWidget('NumberWidget')
    return () => {
      const NumberWidget = NumberWidgetRef.value as CommonWidgetDefine
      // const { value } = props
      return <NumberWidget {...props} onChange={handleChange} />
    }
  },
})
