import { defineComponent, ref, watch } from 'vue'
import { SelectionWidgetPropsDefine, SelectionWidgetDefine } from '../types'

const SelectionWidget: SelectionWidgetDefine = defineComponent({
  name: 'SelectionWidget',
  props: SelectionWidgetPropsDefine,
  setup(props) {
    const currentValueRef = ref(props.value)

    watch(currentValueRef, newVal => {
      if (newVal !== props.value) {
        props.onChange(newVal)
      }
    })
    watch(
      () => props.value,
      v => {
        if (v !== currentValueRef.value) {
          currentValueRef.value = v
        }
      },
    )
    return () => {
      const { options } = props
      return (
        <select multiple={true} v-model={currentValueRef.value}>
          {options.map(opt => {
            return <option value={opt.value}>{opt.key}</option>
          })}
        </select>
      )
    }
  },
})

export default SelectionWidget
