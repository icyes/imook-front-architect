<template>
  <div id="<%= className %>">
    <%= description %>
  </div>
</template>

<script>
export default {
  name: '<%= name %>'
}
</script>

<style>
#<%= className %> {
  width: 100%;
  height: 100%;
}
</style>
