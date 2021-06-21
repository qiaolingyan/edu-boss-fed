<template>
  <div class="aside">
    <router-link class="logo"
                 to="/"
                 title="Back to Home">
      <h1>Edu Boss</h1>
    </router-link>
    <menu-list />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import MenuList from '@/components/MenuList/index.vue'
export default Vue.extend({
  name: 'AppAside',
  components: {
    MenuList
  },
  methods: {}
})
</script>

<style lang="scss" scoped>
.aside {
  height: 100%;
  .el-menu {
    height: 100%;
  }
}
</style>
