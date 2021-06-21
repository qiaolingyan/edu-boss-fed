<template>
  <div class="create">
    <create-edit />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateEdit from './components/create-edit.vue'
export default Vue.extend({
  name: 'Creates',
  components: {
    CreateEdit
  }
})
</script>

<style lang="scss" scoped>
</style>
