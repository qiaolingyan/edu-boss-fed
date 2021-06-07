<template>
  <div class="resource-list">
    <el-card class="box-card">
      <el-form ref="form"
               :model="resourceForm"
               class="demo-form-inline">
        <el-form-item label="资源名称"
                      prop="name">
          <el-input v-model.trim="resourceForm.name"
                    placeholder="资源名称"></el-input>
        </el-form-item>
        <el-form-item label="资源路径"
                      prop="url">
          <el-input v-model.trim="resourceForm.url"
                    placeholder="资源路径"></el-input>
        </el-form-item>
        <el-form-item label="资源分类"
                      prop="categoryId">
          <el-select v-model="resourceForm.categoryId"
                     clearable
                     placeholder="全部">
            <el-option v-for="category in categories"
                       :key="category.id"
                       :label="category.name"
                       :value="category.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     :disabled="isLoading"
                     @click="handleSearchResource">查询搜索
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
        <el-button @click="handleCreateDialogVisible">添加</el-button>
        <el-button @click="$router.push({name:'resource-category'})">资源分类</el-button>
      </div>
      <el-table :data="resources"
                v-loading="isLoading"
                border
                style="width: 100%">
        <el-table-column type="index"
                         label="编号"
                         width="50">
        </el-table-column>
        <el-table-column prop="name"
                         label="资源名称">
        </el-table-column>
        <el-table-column prop="url"
                         label="资源路径">
        </el-table-column>
        <el-table-column prop="description"
                         label="描述">
        </el-table-column>
        <el-table-column prop="createdTime"
                         label="添加时间">
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
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="resourceForm.current"
                   :page-sizes="[10, 20, 30, 40]"
                   :page-size="resourceForm.size"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total"
                   :disabled="isLoading">
    </el-pagination>
    <el-dialog :title="isEdit ? '编辑资源' : '添加资源'"
               :visible.sync="dialogCreateEditVisible">
      <create-edit :categories="categories"
                   :createResourceForm="createResourceForm" />
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogCreateEditVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="handleCreateEditResource">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import {
  getAllResourceCategory,
  getResourcePages,
  deleteResource,
  createOrUpdateResource
} from '@/services/resource'
import CreateEdit from './create-edit.vue'
export default Vue.extend({
  name: 'ResourceList',
  components: {
    CreateEdit
  },
  data() {
    return {
      resources: [],
      categories: [],
      resourceForm: {
        name: '',
        url: '',
        categoryId: null,
        current: 1,
        size: 10
      },
      total: 0,
      isLoading: true,
      dialogCreateEditVisible: false,
      createResourceForm: {
        name: '',
        url: '',
        categoryId: null,
        description: ''
      },
      isEdit: false
    }
  },
  created() {
    this.loadAllresources()
    this.loadAllResourceCategory()
  },
  methods: {
    async loadAllresources() {
      this.isLoading = true
      const { data } = await getResourcePages(this.resourceForm)
      if (data.code === '000000') {
        this.resources = data.data.records
        this.total = data.data.total
        this.isLoading = false
      }
    },
    async loadAllResourceCategory() {
      const { data } = await getAllResourceCategory()
      if (data.code === '000000') {
        this.categories = data.data
      }
    },
    handleSearchResource() {
      this.loadAllresources()
    },
    handleReset() {
      const data = (this.$refs.form as Form).resetFields()
    },
    handleDelete(item: any) {
      this.$confirm('确认删除吗？', '删除提示', {})
        .then(async () => {
          const { data } = await deleteResource(item.id)
          if (data.code === '000000') {
            this.$message.success('已成功删除')
            this.loadAllresources() // 更新数据列表
          }
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    handleSizeChange(val: number) {
      this.resourceForm.size = val
      this.resourceForm.current = 1
      this.loadAllresources()
    },
    handleCurrentChange(val: number) {
      this.resourceForm.current = val
      this.loadAllresources()
    },
    handleCreateDialogVisible() {
      this.createResourceForm = {
        name: '',
        url: '',
        categoryId: null,
        description: ''
      }
      this.isEdit = false
      this.dialogCreateEditVisible = true
    },
    handleEditDialogVisible(item: any) {
      this.createResourceForm = item
      this.isEdit = true
      this.dialogCreateEditVisible = true
    },
    async handleCreateEditResource() {
      const { data } = await createOrUpdateResource(this.createResourceForm)
      const msg = this.isEdit ? '修改成功' : '添加成功'
      if (data.code === '000000') {
        this.$message.success(msg)
        this.dialogCreateEditVisible = false
        this.loadAllresources()
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.el-select {
  width: 100%;
}
</style>
