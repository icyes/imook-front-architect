<template>
  <div @click.prevent="handleClick" :style="styleProps" class="l-shape-component" :draggable="false">
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import useStylePick from '../../hooks/useStylePick'
import { componentsDefaultProps, transformToComponentProps } from '../../defaultProps'
const defaultProps = transformToComponentProps(componentsDefaultProps['l-shape'].props)
// array that contains style props
export default defineComponent({
  name: 'l-shape',
  props: {
    ...defaultProps
  },
  setup (props) {
    const styleProps = useStylePick(props)
    const handleClick = () => {
      if (props.actionType && props.url) {
        window.location.href = props.url
      }
    }

    return {
      styleProps,
      handleClick
    }
  }
})
</script>
