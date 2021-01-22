<template>
  <div>
    <input type="text" :value="value" @input="handleChange" />
  </div>
</template>

<script lang="ts">
import { FieldPropsDefine } from '../types'
import { defineComponent, computed } from 'vue'
export default defineComponent({
  props: FieldPropsDefine,
  setup(props) {
    const handleChange = (v: any) => {
      props.onChange(v.target.value)
    }

    const value = computed(() => {
      return props.value
    })
    return {
      handleChange,
      value,
    }
  },
})
</script>
