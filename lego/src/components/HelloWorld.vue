<template>
  <h1>{{msg}}</h1>
  <button @click="setCount">{{count}}</button>
  <input type="text" v-model="todo"/>
  <button class="addTodo" @click="addTodo">add</button>
  <button class="loadUser" @click="loadUser">load</button>
  <p v-if="user.loading" class="loading">Loading</p>
  <div v-else class="userName">{{user.data && user.data.username}}</div>
  <p v-if="user.error" class="error">error!</p>
  <ul>
    <li v-for="(todo, index) in todos" :key="index">{{todo}}</li>
  </ul>
  <hello msg="1234"></hello>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import Hello from './Hello.vue'
import axios from 'axios'
export default defineComponent({
  name: 'HelloWorld',
  components: {
    Hello
  },
  props: {
    msg: String
  },
  emits: ['send'],
  setup(props, context) {
    const todo = ref('')
    const todos = ref<string[]>([])
    const user = reactive({
      data: null as any,
      loading: false,
      error: false
    })
    const count = ref(1)
    const setCount = () => {
      count.value++
    }
    const addTodo = () => {
      if (todo.value) {
        todos.value.push(todo.value)
        context.emit('send', todo.value)
      }
    }
    const loadUser = () => {
      user.loading = true
      axios.get('https://jsonplaceholder.typicode.com/users/1').then(resp => {
        console.log(resp)
        user.data = resp.data
      }).catch(() => {
        user.error = true
      }).finally(() => {
        user.loading = false
      })
    }
    return {
      count,
      setCount,
      todo,
      todos,
      addTodo,
      user,
      loadUser,
    }
  }
})
</script>