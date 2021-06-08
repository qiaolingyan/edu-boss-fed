<template>
  <div class="course-edit">
    <el-card>
      <div slot="header">
        <el-steps :active="activeStep"
                  simple>
          <el-step v-for="(step,index) in steps"
                   :key="index"
                   :title="step.title"
                   :icon="step.icon"
                   @click.native="activeStep = index"></el-step>

        </el-steps>
      </div>
      <el-form>
        <div v-show="activeStep === 0">

        </div>
        <div v-show="activeStep === 1">

        </div>
        <div v-show="activeStep === 2">

        </div>
        <div v-show="activeStep === 3">

        </div>
        <div v-show="activeStep === 4">

        </div>
        <el-form-item>
          <el-button v-if="activeStep < 4"
                     @click="activeStep++">下一步</el-button>
          <el-button v-else
                     @click="onSubmit">提交</el-button>

        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'CourseEdit',
  data() {
    return {
      activeStep: 0,
      steps: [
        { title: '基本信息', icon: 'el-icon-document' },
        { title: '课程封面', icon: 'el-icon-document' },
        { title: '销售信息', icon: 'el-icon-document' },
        { title: '秒杀活动', icon: 'el-icon-document' },
        { title: '课程详情', icon: 'el-icon-document' }
      ]
    }
  },
  methods: {
    onSubmit() {
      console.log(111)
    }
  }
})
</script>

<style lang="scss" scoped>
.el-step {
  cursor: pointer;
}
</style>
