<template>
  <div class="role-create-edit">
    <el-form ref="form"
             :model="createroleForm"
             label-width="80px"
             class="resource-create-edit">
      <el-form-item label="角色名称"
                    prop="name">
        <el-input v-model.trim="createroleForm.name"
                  placeholder="角色名称"></el-input>
      </el-form-item>
      <el-form-item label="角色编码"
                    prop="code">
        <el-input v-model.trim="createroleForm.code"
                  placeholder="角色编码"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea"
                  v-model="createroleForm.description"></el-input>
      </el-form-item>
      <el-form-item style="text-align:right;">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary"
                   @click="handleSave">确 定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { saveOrUpdate, getRole } from '@/services/role'

export default Vue.extend({
  name: 'RoleCreateEdit',
  props: {
    isEdit: {
      type: Boolean
    },
    roleId: {
      type: Number
    }
  },
  data() {
    return {
      createroleForm: {
        name: '',
        code: '',
        description: ''
      }
    }
  },
  created() {
    if (this.isEdit) {
      this.getRole()
    }
  },
  methods: {
    async handleSave() {
      const { data } = await saveOrUpdate(this.createroleForm)
      const msg = this.isEdit ? '修改成功' : '添加成功'
      if (data.code === '000000') {
        this.$message.success(msg)
        this.$emit('success')
      }
    },
    handleCancel() {
      this.$emit('cancel')
    },
    async getRole() {
      const { data } = await getRole(this.roleId)
      this.createroleForm = data.data
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
