<template>
  <div class="role">
    <role-list />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import RoleList from './components/role-list.vue'
export default Vue.extend({
  name: 'RoleIndex',
  components: {
    RoleList
  }
})
</script>

<style lang="scss" scoped>
</style>
