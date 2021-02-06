import {
  defineComponent,
  PropType,
  provide,
  Ref,
  watch,
  ref,
  shallowRef,
  watchEffect,
} from 'vue'
import Ajv, { Options } from 'ajv'

import { Schema } from './types'
import SchemaItem from './SchemaItem'
import { SchemaFormContextKey } from './context'
import { validateFormData, ErrorSchema } from './validator'

interface ContextRef {
  doValidate: () => Promise<{
    errors: any[]
    valid: boolean
  }>
}

const defaultAjvOptions: Options = {
  allErrors: true,
  // jsonPointers: true,
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
    ajvOptions: {
      type: Object as PropType<Options>,
    },
    locale: {
      type: String,
      default: 'zh',
    },
    customValidate: {
      type: Function as PropType<(data: any, errors: any) => void>,
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

    const validatorRef: Ref<Ajv> = shallowRef() as any
    const errorSchemaRef: Ref<ErrorSchema> = shallowRef({})

    watchEffect(() => {
      validatorRef.value = new Ajv({
        ...defaultAjvOptions,
        ...props.ajvOptions,
      })
    })

    const validateResolveRef = ref()
    const validateIndex = ref(0)

    watch(
      () => props.value,
      () => {
        // 当value改变时，只有在validateResolveRef.value为true时才做校验
        if (validateResolveRef.value) {
          doValidate()
        }
      },
      { deep: true },
    )

    async function doValidate() {
      console.log('start validate --------->')
      const index = (validateIndex.value += 1)
      const result = await validateFormData(
        validatorRef.value,
        props.value,
        props.schema,
        props.locale,
        props.customValidate,
      )
      /**
       * 为了防止短时间内多次执行校验发生性能损耗和错误：
       * 校验是异步的；
       * 第一次点击【校验】,validateIndex.value为1，index为1；
       * 迅速点击第二次校验，validateIndex.value立即变为2，上一次的index还为1，所以根据下面的判断逻辑上一次的校验直接return，不执行校验结果赋值；
       * 这一次的index为2，等于validateIndex.value，执行后续的校验结果赋值等工作
       */
      if (index !== validateIndex.value) return
      console.log('end validate ----------->')

      errorSchemaRef.value = result.errorSchema
      validateResolveRef.value(result)
      validateResolveRef.value = undefined
    }

    // 给contextRef增加异步方法doValidate，在外部点击【校验】按钮来调用该方法
    watch(
      () => props.contextRef,
      () => {
        if (props.contextRef) {
          props.contextRef.value = {
            doValidate() {
              return new Promise(resolve => {
                // 将resolve赋值给validateResolveRef.value，然后doValidate中校验完成后执行resolve，在父组件的doValidate().then中就可以获取到resolve的结果
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

    return () => {
      const { schema, value } = props
      return (
        <SchemaItem
          schema={schema}
          rootSchema={schema}
          value={value}
          onChange={handleChange}
          errorSchema={errorSchemaRef.value || {}}
        />
      )
    }
  },
})
