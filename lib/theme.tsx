import {
  defineComponent,
  PropType,
  computed,
  ComputedRef,
  provide,
  inject,
  ExtractPropTypes,
  ref,
} from 'vue'
import { useVJSFContext } from './context'
import { Theme, FieldPropsDefine } from './types'
import { isObject } from './utils'

const THEME_PROVIDER_KEY = Symbol()

const ThemeProvider = defineComponent({
  name: 'VJSFThemeProvider',
  props: {
    theme: {
      type: Object as PropType<Theme>,
      required: true,
    },
  },
  setup(props, { slots }) {
    // 对context进行响应式处理(computed返回的是ComputedRef类型)
    const context = computed(() => props.theme)
    provide(THEME_PROVIDER_KEY, context)

    return () => slots.default && slots.default()
  },
})

export function getWidget(
  name: keyof Theme['widgets'],
  props?: ExtractPropTypes<typeof FieldPropsDefine>,
) {
  const formContext = useVJSFContext()
  if (props) {
    const { uiSchema, schema } = props
    if (uiSchema?.widget && isObject(uiSchema.widget)) {
      return ref(uiSchema.widget)
    }
    // if (schema.format) {
    //   if (formContext.formatMapRef.value[schema.format]) {
    //     return ref(formContext.formatMapRef.value[schema.format])
    //   }
    // }
  }
  const context = inject<ComputedRef<Theme>>(THEME_PROVIDER_KEY)

  if (!context) throw Error('vjsf theme required')

  return computed(() => context.value.widgets[name])
}

export default ThemeProvider
