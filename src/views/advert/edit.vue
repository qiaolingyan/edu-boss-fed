<template>
  <div class="edit">
    <create-edit is-edit />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateEdit from './components/create-edit.vue'

export default Vue.extend({
  name: 'Edit',
  components: {
    CreateEdit
  }
})
</script>

<style lang="scss" scoped>
</style>
