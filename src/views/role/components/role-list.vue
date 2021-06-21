<template>
  <div class="role-list">
    <el-card class="box-card">
      <el-form ref="form"
               :model="roleForm"
               class="demo-form-inline">
        <el-form-item label="输入搜索"
                      prop="name">
          <el-input v-model.trim="roleForm.name"
                    placeholder="角色名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     :disabled="isLoading"
                     @click="loadAllroles">查询搜索
          </el-button>
          <el-button type="primary"
                     @click="handleReset">重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header"
           class="clearfix">
        <el-button @click="handleCreateDialogVisible">添加角色</el-button>
      </div>
      <el-table :data="roles"
                v-loading="isLoading"
                border
                style="width: 100%">
        <el-table-column type="index"
                         label="编号"
                         width="50">
        </el-table-column>
        <el-table-column prop="name"
                         label="角色名称">
        </el-table-column>
        <el-table-column prop="description"
                         label="描述">
        </el-table-column>
        <el-table-column prop="createdTime"
                         label="添加时间">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="$router.push({
                          name:'AllocMenu',
                          params:{
                            roleId:scope.row.id
                          }
                        })"
                       type="text"
                       size="small">分配菜单</el-button>
            <el-button @click="$router.push({
                          name:'AllocResource',
                          params:{
                            roleId:scope.row.id
                          }
                        })"
                       type="text"
                       size="small">分配资源</el-button>
            <el-button @click="handleEditDialogVisible(scope.row)"
                       type="text"
                       size="small">编辑</el-button>
            <el-button @click="handleDelete(scope.row)"
                       type="text"
                       size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :title="isEdit ? '编辑角色' : '添加角色'"
               :visible.sync="dialogCreateEditVisible">
      <create-edit v-if="dialogCreateEditVisible"
                   :roleId="roleId"
                   :isEdit="isEdit"
                   @success="onSuccess"
                   @cancel="dialogCreateEditVisible" />

    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { getRolePages, deleteRoles } from '@/services/role'
import CreateEdit from './create-edit.vue'
export default Vue.extend({
  name: 'RoleList',
  components: {
    CreateEdit
  },
  data() {
    return {
      roles: [],
      categories: [],
      roleForm: {
        name: ''
      },
      total: 0,
      isLoading: true,
      dialogCreateEditVisible: false,
      isEdit: false,
      roleId: null
    }
  },
  created() {
    this.loadAllroles()
  },
  methods: {
    async loadAllroles() {
      this.isLoading = true
      try {
        const { data } = await getRolePages(this.roleForm)
        if (data.code === '000000') {
          this.roles = data.data.records
          this.total = data.data.total
          this.isLoading = false
        }
      } catch (err) {
        this.isLoading = false
      }
    },
    handleSearchResource() {
      this.loadAllroles()
    },
    handleReset() {
      const data = (this.$refs.form as Form).resetFields()
    },
    handleDelete(item: any) {
      this.$confirm('确认删除吗？', '删除提示', {})
        .then(async () => {
          const { data } = await deleteRoles(item.id)
          if (data.code === '000000') {
            this.$message.success('已成功删除')
            this.loadAllroles() // 更新数据列表
          }
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    handleCreateDialogVisible() {
      this.isEdit = false
      this.dialogCreateEditVisible = true
    },
    handleEditDialogVisible(item: any) {
      this.roleId = item.id
      this.isEdit = true
      this.dialogCreateEditVisible = true
    },
    onSuccess() {
      this.dialogCreateEditVisible = false
      this.loadAllroles()
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
