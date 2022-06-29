<template>
  <h1 ref="node">{{msg}}</h1>
  <h1>{{count}}</h1>
  <button @click="count++">change</button>
</template>

<script lang="ts">
import { defineComponent, watch, ref, toRefs } from 'vue'
export default defineComponent({
  name: 'Hello',
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const count = ref(1)
    const node = ref<null | HTMLElement>(null)
    const { msg } = toRefs(props)
    watch([() => props.msg, count], (newValue, oldValue) => {
      console.log('old', oldValue)
      console.log('new', newValue)
      console.log(count.value)
    })
    return {
      count,
      node
    }
  }
})
</script>

<style>

</style>