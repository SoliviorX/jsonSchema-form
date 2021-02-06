import { defineComponent, computed } from 'vue'
import { FieldPropsDefine, CommonWidgetDefine } from '../types'
import { getWidget } from '../theme'

export default defineComponent({
  name: 'StringField',
  props: FieldPropsDefine,
  setup(props) {
    const handleChange = (v: any) => {
      props.onChange(v)
    }
    const TextWidgetRef = computed(() => {
      return getWidget('TextWidget').value
    })
    return () => {
      const TextWidget = TextWidgetRef.value as CommonWidgetDefine
      // const { schema, rootSchema, ...rest } = props
      return <TextWidget {...props} onChange={handleChange} />
    }
  },
})
