<template>
  <div class="header">
    <breadcrumb />

    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar shape="square"
                   :size="40"
                   :src="userInfo.portrait || require('@/assets/default-avatar.png')"></el-avatar>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
        <el-dropdown-item divided
                          @click.native="handleLogout">登出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getUserInfo } from '@/services/user'
import Breadcrumb from './breadcrumb.vue'
export default Vue.extend({
  name: 'AppHeader',
  components: {
    Breadcrumb
  },
  data() {
    return {
      userInfo: {}
    }
  },
  created() {
    this.loadUserInfo()
  },
  methods: {
    async loadUserInfo() {
      try {
        const { data } = await getUserInfo()
        if (data.state === 1) {
          this.userInfo = data.content
        }
      } catch (err) {
        console.log(err)
      }
    },
    handleLogout() {
      this.$confirm('确认退出吗?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store.commit('setUser', null)
          this.$router.push({
            name: 'login'
          })
          this.$message({
            type: 'success',
            message: '退出成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .el-dropdown-link {
    display: flex;
    align-items: center;
  }
}
</style>
