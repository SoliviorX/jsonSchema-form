import { defineComponent } from 'vue'
import { FieldPropsDefine } from '../types'

export default defineComponent({
  name: 'NumberField',
  props: FieldPropsDefine,
  setup(props) {
    const handleChange = (v: any) => {
      const value = Number(v.target.value)
      props.onChange(value)
    }
    return () => {
      const { value } = props
      return (
        <input type="number" value={value as number} onInput={handleChange} />
      )
    }
  },
})
