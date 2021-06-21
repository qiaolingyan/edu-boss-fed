<template>
  <div class="course-lesson-edit">
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
                  disabled
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="课时名称"
                    prop="theme">
        <el-input v-model="form.theme"
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="时长"
                    prop="duration">
        <el-input placeholder="请输入内容"
                  v-model="form.duration">
          <template slot="append">分钟</template>
        </el-input>
      </el-form-item>
      <el-form-item label="是否开放试听"
                    prop="isFree">
        <el-switch v-model="form.isFree"
                   active-color="#13ce66"
                   inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item label="课时排序"
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
  name: 'CourseLessonEdit',
  props: {
    form: {
      type: Object
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
