<template>
  <div class="menu-create">
    <el-card class="box-card">
      <div slot="header"
           class="clearfix">
        <span>{{isEdit ? '编辑菜单' : '添加菜单'}}</span>
      </div>
      <el-form ref="form"
               :model="form"
               :rules="rules"
               label-width="80px">
        <el-form-item label="菜单名称"
                      prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径"
                      prop="href">
          <el-input v-model="form.href"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单"
                      prop="parentId">
          <el-select v-model="form.parentId"
                     placeholder="请选择上级菜单">
            <el-option label="无上级菜单"
                       :value="-1"></el-option>
            <el-option v-for="menu in parentMenuList"
                       :label="menu.name"
                       :key="menu.id"
                       :value="menu.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述"
                      prop="description">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="前端图标"
                      prop="icon">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>
        <el-form-item label="是否显示"
                      prop="shown">
          <el-radio-group v-model="form.shown">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序"
                      prop="orderNum">
          <el-input-number v-model="form.orderNum"
                           :min="1"
                           :max="10"
                           label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="onSubmit">提交</el-button>
          <el-button v-if="!isEdit"
                     @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { createOrUpdateMenu, getEditMenuInfo } from '@/services/menu'
export default Vue.extend({
  name: 'MenuCreate',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        parentId: -1, // -1 表示没有上级菜单
        name: '',
        href: '',
        icon: '',
        orderNum: 0,
        description: '',
        shown: false
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入菜单名称',
            trigger: 'blur'
          }
        ],
        description: [
          {
            required: true,
            message: '请输入菜单名称',
            trigger: 'blur'
          }
        ],
        icon: [
          {
            required: true,
            message: '请输入菜单名称',
            trigger: 'blur'
          }
        ]
      },
      parentMenuList: [] // 父级菜单列表
    }
  },
  created() {
    this.loadMenuInfo()
  },
  methods: {
    async loadMenuInfo() {
      const { data } = await getEditMenuInfo(this.$route.params.id || -1)

      if (data.code === '000000') {
        if (data.data.menuInfo) {
          this.form = data.data.menuInfo
        }
        this.parentMenuList = data.data.parentMenuList
      }
    },
    async onSubmit() {
      try {
        await (this.$refs.form as Form).validate()
        const { data } = await createOrUpdateMenu(this.form)
        if (data.code === '000000') {
          // this.$router.back() // 回退
          this.$router.push({
            path: '/menu',
            name: 'menu'
          })
        }
      } catch (err) {}
    },
    handleReset() {
      const data = (this.$refs.form as Form).resetFields()
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
