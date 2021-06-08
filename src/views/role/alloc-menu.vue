<template>
  <div class="role-alloc-menu">
    <el-card>
      <div slot="header">
        <span>分配权限</span>
      </div>
      <el-tree ref="menu-tree"
               :data="menus"
               :props="defaultProps"
               :default-checked-keys="checkedKeys"
               node-key="id"
               show-checkbox
               default-expand-all>
      </el-tree>
      <div>
        <el-button @click="resetChecked">清空</el-button>
        <el-button type="primary"
                   @click="onSave">保存</el-button>
      </div>
    </el-card>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  getMenuNodeList,
  allocateRoleMenus,
  getRoleMenus
} from '@/services/menu'
import { Tree } from 'element-ui'
export default Vue.extend({
  name: 'RoleAllocMenu',
  props: {
    roleId: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      menus: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      },
      checkedKeys: []
    }
  },
  created() {
    this.getMenuNodeList()
    this.getRoleMenus()
  },
  methods: {
    async getRoleMenus() {
      const { data } = await getRoleMenus(this.roleId)
      if (data.code === '000000') {
        this.getCheckedKeys(data.data)
      }
    },
    getCheckedKeys(menus: any) {
      menus.forEach((menu: any) => {
        if (menu.selected) {
          this.checkedKeys = [...this.checkedKeys, menu.id] as never
        }
        if (menu.subMenuList) {
          this.getCheckedKeys(menu.subMenuList)
        }
      })
    },
    async getMenuNodeList() {
      const { data } = await getMenuNodeList()
      if (data.code === '000000') {
        this.menus = data.data
      }
    },
    resetChecked() {
      const data = (this.$refs['menu-tree'] as Tree).setCheckedKeys([])
    },
    async onSave() {
      const menuIdList = (this.$refs['menu-tree'] as Tree).getCheckedKeys()
      const { data } = await allocateRoleMenus({
        roleId: this.roleId,
        menuIdList
      })
      if (data.code === '000000') {
        this.$message.success(data.mesg)
      }
      this.$router.back()
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
