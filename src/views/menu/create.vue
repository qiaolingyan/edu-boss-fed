<template>
  <div class="menu-create">
    <create-edit />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateEdit from './components/create-edit.vue'
export default Vue.extend({
  name: 'MenuCreate',
  components: {
    CreateEdit
  },
  data() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
</style>
