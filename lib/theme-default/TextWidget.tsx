import { defineComponent } from 'vue'
import { CommonWidgetPropsDefine, CommonWidgetDefine } from '../types'

const TextWidget: CommonWidgetDefine = defineComponent({
  name: 'TextWidget',
  props: CommonWidgetPropsDefine,
  setup(props) {
    const handleChange = (e: any) => {
      const v = e.target.value
      e.target.value = props.value
      props.onChange(v)
    }
    // const styleRef = computed(() => {
    //   return { color: (props.options && props.options.color) || 'black' }
    // })
    return () => {
      const { value } = props
      return (
        <input
          type="text"
          value={value as any}
          onInput={handleChange}
          // style={styleRef.value}
        />
      )
    }
  },
})

export default TextWidget
