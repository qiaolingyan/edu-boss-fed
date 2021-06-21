<template>
  <div class="course-section-edit">
    <el-form ref="form"
             :model="form"
             label-width="80px">
      <el-form-item label="课程名称"
                    prop="courseName">
        <el-input v-model="form.courseName"
                  disabled
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="章节名称"
                    prop="sectionName">
        <el-input v-model="form.sectionName"
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="章节描述"
                    prop="description">
        <el-input v-model="form.description"
                  type="textarea"
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="章节排序"
                    prop="orderNum">
        <el-input placeholder="请输入内容"
                  v-model="form.orderNum">
          <template slot="append">数字控制排序，数字越大越靠后</template>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'CourseSectionEdit',
  props: {
    form: {
      type: Object
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
