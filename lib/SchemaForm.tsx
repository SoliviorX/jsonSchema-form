import {
  defineComponent,
  PropType,
  provide,
  Ref,
  watch,
  ref,
  shallowRef,
} from 'vue'
import Ajv, { Options } from 'ajv'

import { Schema } from './types'
import SchemaItem from './SchemaItem'
import { SchemaFormContextKey } from './context'

interface ContextRef {
  doValidate: () => Promise<{
    errors: any[]
    valid: boolean
  }>
}

export default defineComponent({
  name: 'SchemaForm',
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    value: {
      required: true,
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true,
    },
    contextRef: {
      type: Object as PropType<Ref<ContextRef | undefined>>,
    },
  },
  setup(props) {
    const handleChange = (v: any) => {
      props.onChange(v)
    }

    const context: any = {
      SchemaItem,
    }
    provide(SchemaFormContextKey, context)

    const validateResolveRef = ref()
    const validatorRef: Ref<Ajv> = shallowRef() as any

    watch(
      () => props.contextRef,
      () => {
        if (props.contextRef) {
          props.contextRef.value = {
            doValidate() {
              return new Promise(resolve => {
                validateResolveRef.value = resolve
                doValidate()
              })
            },
          }
        }
      },
      {
        // 第一次进来就立即执行，不需要watch到变化才执行
        immediate: true,
      },
    )
    async function doValidate() {
      console.log('start validate --------->')
    }

    return () => {
      const { schema, value } = props
      return (
        <SchemaItem
          schema={schema}
          rootSchema={schema}
          value={value}
          onChange={handleChange}
        />
      )
    }
  },
})
