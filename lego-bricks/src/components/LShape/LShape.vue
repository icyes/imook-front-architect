<template>
  <div 
    :style="styleProps" 
    class="l-shape-component" 
    @click.prevent="handleClick"
  ></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import useComponentCommon from '../../hooks/useComponentCommon'
import { transformToComponentProps, shapeDefaultProps, shapeStylePropsNames } from '../../defaultProps'
const defaultProps = transformToComponentProps(shapeDefaultProps)

// array that contains style props
export default defineComponent({
  name: 'l-shape',
  props: {
    ...defaultProps
  },
  setup (props) {
    // 重用并且简化
    // 抽离并且获得 styleProps
    const { styleProps, handleClick } = useComponentCommon(props, shapeStylePropsNames)
    return {
       styleProps,
       handleClick
    }
  }
})
</script>
