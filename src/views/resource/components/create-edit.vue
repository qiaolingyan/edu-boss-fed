<template>
  <el-form ref="form"
           :model="createResourceForm"
           label-width="80px"
           class="resource-create-edit">
    <el-form-item label="资源名称"
                  prop="name">
      <el-input v-model.trim="createResourceForm.name"
                placeholder="资源名称"></el-input>
    </el-form-item>
    <el-form-item label="资源路径"
                  prop="url">
      <el-input v-model.trim="createResourceForm.url"
                placeholder="资源路径"></el-input>
    </el-form-item>
    <el-form-item label="资源分类"
                  prop="categoryId">
      <el-select v-model="createResourceForm.categoryId"
                 clearable
                 placeholder="全部">
        <el-option v-for="category in categories"
                   :key="category.id"
                   :label="category.name"
                   :value="category.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="描述">
      <el-input type="textarea"
                v-model="createResourceForm.description"></el-input>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'ResourceCreateEdit',
  props: {
    categories: {
      type: Array
    },
    createResourceForm: {
      type: Object
    }
  },
  data() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.el-select {
  width: 100%;
}
</style>
