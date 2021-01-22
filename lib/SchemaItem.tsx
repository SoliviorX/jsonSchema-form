import { defineComponent, PropType } from 'vue'
import NumberField from './fields/NumberField'
import StringField from './fields/StringField'
// import StringField from './fields/StringField.vue'

import { SchemaTypes, FieldPropsDefine } from './types'

export default defineComponent({
  name: 'SchemaItem', // 中转组件, 根据type中转到不同的组件
  props: FieldPropsDefine,
  setup(props) {
    return () => {
      const { schema } = props
      // TODO: 用户可能没有写schema的type值，如果type没有指定，我们需要猜测这个type\

      const type = schema.type
      let Component: any
      switch (type) {
        case SchemaTypes.STRING: {
          Component = StringField
          break
        }
        case SchemaTypes.NUMBER: {
          Component = NumberField
          break
        }
        default: {
          console.warn(`${type} is not supported`)
        }
      }
      return <Component {...props} />
    }
  },
})
