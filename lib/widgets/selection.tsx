import { defineComponent, ref, PropType, watch } from 'vue'

export default defineComponent({
  name: 'SelectionWidgets',
  props: {
    value: {},
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true,
    },
    options: {
      type: Array as PropType<
        {
          key: string
          value: any
        }[]
      >,
      required: true,
    },
  },
  setup(props) {
    const currentValueRef = ref(props.value)

    watch(currentValueRef, (newVal, oldVal) => {
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
