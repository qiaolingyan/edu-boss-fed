<template>
  <div class="course-create-edit">
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
      <el-form label-width="100px">
        <div v-show="activeStep === 0">
          <el-form-item label="课程名称">
            <el-input v-model="course.courseName"></el-input>
          </el-form-item>
          <el-form-item label="课程简介">
            <el-input v-model="course.brief"></el-input>
          </el-form-item>
          <el-form-item label="讲师姓名">
            <el-input v-model="course.teacherDTO.teacherName"></el-input>
          </el-form-item>
          <el-form-item label="讲师职位">
            <el-input v-model="course.teacherDTO.position"></el-input>
          </el-form-item>
          <el-form-item label="讲师简介">
            <el-input v-model="course.teacherDTO.description"></el-input>
          </el-form-item>
          <el-form-item label="课程概述">
            <el-input type="textarea"
                      v-model="course.previewFirstField"
                      placeholder="概述1">
            </el-input>
            <el-input type="textarea"
                      v-model="course.previewSecondField"
                      placeholder="概述2">
            </el-input>

          </el-form-item>
          <el-form-item label="课程排序">
            <el-input-number v-model="course.sortNum"></el-input-number>
          </el-form-item>
        </div>
        <div v-show="activeStep === 1">
          <el-form-item label="课程封面">
            <course-upload v-model="course.courseListImg" />
          </el-form-item>
          <el-form-item label="介绍封面">
            <course-upload v-model="course.courseImgUrl" />
          </el-form-item>
        </div>
        <div v-show="activeStep === 2">
          <el-form-item label="售卖价格">
            <el-input placeholder="请输入内容"
                      v-model="course.discounts">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="商品原价">
            <el-input placeholder="请输入内容"
                      v-model="course.price">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="销量">
            <el-input placeholder="请输入内容"
                      v-model="course.sales">
              <template slot="append">单</template>
            </el-input>
          </el-form-item>
          <el-form-item label="活动标签">
            <el-input type="text"
                      placeholder="请输入内容"
                      v-model="course.discountsTag"
                      maxlength="4"
                      show-word-limit>
            </el-input>
          </el-form-item>
        </div>
        <div v-show="activeStep === 3">
          <el-form-item label="限时秒杀开关">
            <el-switch v-model="course.activityCourse"
                       active-color="#13ce66"
                       inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
          <template v-if="course.activityCourse">

            <el-form-item label="开始时间">
              <el-date-picker type="datetime"
                              placeholder="选择日期时间"
                              v-model="course.activityCourseDTO.beginTime">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker type="datetime"
                              placeholder="选择日期时间"
                              v-model="course.activityCourseDTO.endTime">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="秒杀价">
              <el-input placeholder="请输入内容"
                        v-model="course.activityCourseDTO.amount">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="秒杀库存">
              <el-input placeholder="请输入内容"
                        v-model="course.activityCourseDTO.stock">
                <template slot="append">个</template>
              </el-input>
            </el-form-item>
          </template>
        </div>
        <div v-show="activeStep === 4">
          <el-form-item label="课程详情">
            <text-editor v-model="course.courseDescriptionMarkDown" />
          </el-form-item>
          <el-form-item label="是否发布">
            <el-switch v-model="course.status"
                       :active-value="1"
                       :inactive-value="0"
                       active-color="#13ce66"
                       inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
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
import { saveOrUpdateCourse, getCourseById } from '@/services/course'
import CourseUpload from './course-upload.vue'
import TextEditor from '@/components/TextEditor/index.vue'
export default Vue.extend({
  name: 'CourseCreateEdit',
  components: {
    CourseUpload,
    TextEditor
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    courseId: {
      type: [Number, String]
    }
  },
  data() {
    return {
      activeStep: 0,
      steps: [
        { title: '基本信息', icon: 'el-icon-document' },
        { title: '课程封面', icon: 'el-icon-document' },
        { title: '销售信息', icon: 'el-icon-document' },
        { title: '秒杀活动', icon: 'el-icon-document' },
        { title: '课程详情', icon: 'el-icon-document' }
      ],
      course: {
        // id: 0,
        courseName: '',
        brief: '',
        teacherDTO: {
          // id: 0,
          // courseId: 0,
          teacherName: '',
          teacherHeadPicUrl: '',
          position: '',
          description: ''
        },
        courseDescriptionMarkDown: '',
        price: 0,
        discounts: 0,
        priceTag: '',
        discountsTag: '',
        isNew: true,
        isNewDes: '',
        courseListImg: '',
        courseImgUrl: '',
        sortNum: 0,
        previewFirstField: '',
        previewSecondField: '',
        status: 0, // 0 未上架，1 已上架
        sales: 0,
        activityCourse: false,
        activityCourseDTO: {
          // id: 0,
          // courseId: 0,
          beginTime: '',
          endTime: '',
          amount: 0,
          stock: 0
        },
        autoOnlineTime: ''
      }
    }
  },
  created() {
    if (this.isEdit) {
      this.getCourseById()
    }
  },
  methods: {
    async onSubmit() {
      const { data } = await saveOrUpdateCourse(this.course)
      if (data.code === '000000') {
        this.$message.success('创建成功')
        this.$router.back()
      }
    },
    async getCourseById() {
      const { data } = await getCourseById(this.courseId)
      if (data.code === '000000') {
        this.course = data.data
        if (!this.course.activityCourse) {
          this.course.activityCourseDTO = {
            beginTime: '',
            endTime: '',
            amount: 0,
            stock: 0
          }
        }
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.course-create-edit {
  .el-step {
    cursor: pointer;
  }
  .input-number {
    width: 100%;
  }
}
</style>
