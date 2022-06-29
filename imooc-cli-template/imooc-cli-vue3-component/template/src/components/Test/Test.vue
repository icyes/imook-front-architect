<template>
  <div class="<%= className %>">
    {{message}}
  </div>
</template>

<script>
export default {
  name: '<%= name %>',
  props: {
  },
  setup(ctx) {
    const message = '<%= description %>'
    return {
      message
    }
  }
}
</script>

<style type="text/css">
  .<%= className %> {
    color: red;
  }
</style>