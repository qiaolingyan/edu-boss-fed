<template>
  <el-form ref="form"
           :model="createCategoryForm"
           label-width="80px"
           class="resource-create-edit">
    <el-form-item label="名称"
                  prop="name">
      <el-input v-model.trim="createCategoryForm.name"
                placeholder="名称"></el-input>
    </el-form-item>
    <el-form-item label="排序"
                  prop="sort">
      <el-input v-model.trim="createCategoryForm.sort"
                placeholder="排序"></el-input>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'ResourceCreateEdit',
  props: {
    createCategoryForm: {
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
