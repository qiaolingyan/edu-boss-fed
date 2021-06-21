<template>
  <el-menu class="el-menu"
           default-active="4"
           @select="handleSelect"
           background-color="#545c64"
           text-color="#fff"
           active-text-color="#ffd04b"
           :collapse="false">
    <menu-item v-for="menu in menuList"
               :key="menu.id"
               :menu="menu" />
  </el-menu>
</template>

<script lang="ts">
import Vue from 'vue'
import MenuItem from './MenuItem.vue'
import { mapState } from 'vuex'
export default Vue.extend({
  name: 'MenuList',
  components: {
    MenuItem
  },
  computed: {
    menuList() {
      return this.$store.state.menuList
    }
  },
  methods: {
    handleSelect(index: any, indexPath: any) {
      let str = ''
      indexPath.forEach((item: any) => {
        str += item
      })
      this.$router.push({
        name: index,
        path: str
      })
      console.log(index, str)
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
