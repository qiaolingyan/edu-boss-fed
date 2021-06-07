<template>
  <div class="resource-category">
    <el-card class="box-card">
      <div slot="header"
           class="clearfix">
        <el-button @click="handleCreateDialogVisible">添加</el-button>
      </div>
      <el-table :data="resourceCategories"
                border
                style="width: 100%">
        <el-table-column type="index"
                         label="编号"
                         width="50">
        </el-table-column>
        <el-table-column prop="name"
                         label="名称">
        </el-table-column>
        <el-table-column prop="createdTime"
                         label="创建时间">
        </el-table-column>
        <el-table-column prop="sort"
                         label="排序">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
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
    <el-dialog :title="isEdit ? '编辑分类' : '添加分类'"
               :visible.sync="dialogCreateEditVisible">
      <create-edit-category :createCategoryForm="createCategoryForm" />
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogCreateEditVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="handleCreateEditCategory">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  getAllResourceCategory,
  deleteResourceCategory,
  createOrUpdateResourceCategory
} from '@/services/resource'
import CreateEditCategory from './components/create-edit-category.vue'

export default Vue.extend({
  name: 'ResouceCategory',
  components: {
    CreateEditCategory
  },
  data() {
    return {
      resourceCategories: [],
      dialogCreateEditVisible: false,
      createCategoryForm: {
        name: '',
        sort: ''
      },
      isEdit: false
    }
  },
  created() {
    this.loadAllResourceCategories()
  },
  methods: {
    async loadAllResourceCategories() {
      const { data } = await getAllResourceCategory()
      if (data.code === '000000') {
        this.resourceCategories = data.data
      }
    },
    handleCreateDialogVisible() {
      this.createCategoryForm = {
        name: '',
        sort: ''
      }
      this.isEdit = false
      this.dialogCreateEditVisible = true
    },
    handleEditDialogVisible(item: any) {
      this.createCategoryForm = item
      this.isEdit = true
      this.dialogCreateEditVisible = true
    },
    async handleCreateEditCategory() {
      const { data } = await createOrUpdateResourceCategory(
        this.createCategoryForm
      )
      const msg = this.isEdit ? '修改成功' : '添加成功'
      if (data.code === '000000') {
        this.$message.success(msg)
        this.dialogCreateEditVisible = false
        this.loadAllResourceCategories()
      }
    },
    handleDelete(item: any) {
      this.$confirm('确认删除吗？', '删除提示', {})
        .then(async () => {
          const { data } = await deleteResourceCategory(item.id)
          if (data.code === '000000') {
            this.$message.success('已成功删除')
            this.loadAllResourceCategories() // 更新数据列表
          }
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
