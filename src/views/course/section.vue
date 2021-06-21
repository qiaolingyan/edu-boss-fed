<template>
  <div class="course-section">
    <div class="course-section-header">
      <el-page-header @back="goBack"
                      :content="courseName">

      </el-page-header>
      <el-button class="add-section"
                 type="primary"
                 icon="el-icon-plus"
                 @click="handleSaveSection">添加阶段</el-button>
    </div>

    <el-card>
      <el-tree :data="sections"
               :props="defaultProps"
               :allow-drop="handleAllowDrop"
               draggable
               default-expand-all
               @node-drop="handleSort">
        <div class="inner"
             slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span v-if="data.sectionName"
                class="actions">
            <el-button size="mini"
                       @click="handleUpdateSection(node,data)">
              编辑
            </el-button>
            <el-button type="primary"
                       size="mini"
                       @click="handleEditLesson(data)">
              添加课时
            </el-button>
            <el-button size="mini"
                       @click="handleUpdateStatus(data)">
              {{data.status === 0 ? '已隐藏' : (data.status === '1' ? '待更新' : '已更新')}}
            </el-button>
          </span>
          <span v-else
                class="actions">
            <el-button size="mini"
                       @click="handleUpdateLesson(data)">
              编辑
            </el-button>
            <el-button type="success"
                       size="mini"
                       @click="$router.push({
                         name:'course-video',
                         params:{
                           courseId,
                         },
                         query:{
                           sectionId:node.parent.id,
                           lessonId:data.id
                         }
                       })">
              上传视频
            </el-button>
            <el-button size="mini"
                       @click="handleUpdateStatus(data)">
              {{data.status === 0 ? '已隐藏' : (data.status === '1' ? '待更新' : '已更新')}}
            </el-button>
          </span>
        </div>
      </el-tree>
    </el-card>
    <el-dialog title="章节信息"
               :visible.sync="dialogFormVisible">
      <course-section-edit ref="editForm"
                           :form="editForm" />
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="onCancel">取 消</el-button>
        <el-button type="primary"
                   @click="onSave">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="课时基本信息"
               :visible.sync="lessonFormVisible">
      <course-lesson-edit ref="lessonForm"
                          :form="lessonForm" />
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="onCancelLessonForm">取 消</el-button>
        <el-button type="primary"
                   @click="onSaveLessonForm">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="提示"
               :visible.sync="statusFormVisible"
               width="400px">
      <course-status ref="statusForm"
                     :form="statusForm" />
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="onCancelStatusForm">取 消</el-button>
        <el-button type="primary"
                   @click="onSaveStatusForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  getSectionAndLesson,
  saveOrUpdateSection,
  saveOrUpdate,
  getById
} from '@/services/course-section'
import { getCourseById } from '@/services/course'
import { ElStep } from 'element-ui/types/step'
import CourseSectionEdit from './components/course-section-edit.vue'
import CourseLessonEdit from './components/course-lesson-edit.vue'
import CourseStatus from './components/course-status.vue'
import { Form } from 'element-ui'
export default Vue.extend({
  name: 'CourseSection',
  components: {
    CourseSectionEdit,
    CourseLessonEdit,
    CourseStatus
  },
  props: {
    courseId: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      sections: [],
      defaultProps: {
        children: 'lessonDTOS',
        label(data: any) {
          return data.sectionName || data.theme
        }
      },
      dialogFormVisible: false,
      editForm: {
        courseName: '',
        sectionName: '',
        description: '',
        orderNum: 0
      },
      courseName: '',
      lessonForm: {
        courseName: '',
        sectionName: '',
        sectionId: 0,
        theme: '',
        duration: 0,
        isFree: true,
        orderNum: 0
      },
      lessonFormVisible: false,
      statusForm: {
        id: 0,
        status: 0
      },
      statusFormVisible: false,
      isLesson: false
    }
  },
  created() {
    this.getCourseById()
    this.getSectionAndLesson()
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    async getSectionAndLesson() {
      const { data } = await getSectionAndLesson(this.courseId)
      if (data.code === '000000') {
        this.sections = data.data
      }
    },
    async getCourseById() {
      const { data } = await getCourseById(this.courseId)
      if (data.code === '000000') {
        this.courseName = data.data.courseName
        this.editForm.courseName = this.courseName
      }
    },
    handleAllowDrop(draggingNode: any, dropNode: any, type: any) {
      // draggingNode 拖拽节点
      // dropNode 放置的目标节点
      // type 'prev'、'inner' 和 'next'，分别表示放置在目标节点前、插入至目标节点和放置在目标节点后

      return (
        draggingNode.data.sectionId === dropNode.data.sectionId &&
        type !== 'inner'
      )
    },
    async handleSort(dragNode: any, dropNode: any, type: any, event: any) {
      // this.sections
      // console.log(dropNode.parent.data)
      try {
        await Promise.all(
          dropNode.parent.childNodes.map((item: any, index: number) => {
            if (dragNode.data.lessonDTOS) {
              // 阶段
              return saveOrUpdateSection({
                id: item.data.id,
                orderNum: index + 1
              })
            } else {
              // 课时
              return saveOrUpdateSection({
                id: item.data.id,
                orderNum: index + 1
              })
            }
          })
        )
        this.$message.error('排序成功')
      } catch (e) {
        this.$message.error('排序失败')
      }
    },
    handleSaveSection() {
      this.dialogFormVisible = true
    },
    handleUpdateSection(node: any, data: any) {
      this.editForm = {
        courseName: this.courseName,
        ...data
      }
      this.dialogFormVisible = true
    },
    async onSave() {
      const { data } = await saveOrUpdateSection({
        ...this.editForm,
        courseId: this.courseId
      })
      if (data.code === '000000') {
        this.dialogFormVisible = false
        const a = ((this.$refs.editForm as Vue).$refs
          .form as Form).resetFields()
        this.getSectionAndLesson()
      }
    },
    onCancel() {
      this.dialogFormVisible = false
      const a = ((this.$refs.editForm as Vue).$refs.form as Form).resetFields()
    },
    handleEditLesson(data: any) {
      this.lessonForm.courseName = this.courseName
      this.lessonForm.sectionName = data.sectionName
      this.lessonForm.sectionId = data.id
      this.lessonFormVisible = true
    },
    handleUpdateLesson(data: any) {
      this.lessonForm = {
        courseName: this.courseName,
        ...data
      }
      this.lessonFormVisible = true
    },
    onCancelLessonForm() {
      this.lessonFormVisible = false
      const a = ((this.$refs.lessonForm as Vue).$refs
        .form as Form).resetFields()
    },
    async onSaveLessonForm() {
      const { data } = await saveOrUpdate({
        ...this.lessonForm,
        courseId: this.courseId
      })
      if (data.code === '000000') {
        this.lessonFormVisible = false
        const a = ((this.$refs.lessonForm as Vue).$refs
          .form as Form).resetFields()
        this.getSectionAndLesson()
      }
    },
    handleUpdateStatus(data: any) {
      this.statusForm = {
        id: data.id,
        status: data.status
      }
      console.log(data)
      if (data.theme) {
        this.isLesson = true
      } else {
        this.isLesson = false
      }
      this.statusFormVisible = true
    },
    onCancelStatusForm() {
      this.statusFormVisible = false
      const a = ((this.$refs.statusForm as Vue).$refs
        .form as Form).resetFields()
      this.getSectionAndLesson()
    },
    async onSaveStatusForm() {
      const { data } = await (this.isLesson
        ? saveOrUpdate(this.statusForm)
        : saveOrUpdateSection(this.statusForm))
      if (data.code === '000000') {
        this.statusFormVisible = false
        const a = ((this.$refs.statusForm as Vue).$refs
          .form as Form).resetFields()
        this.getSectionAndLesson()
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.course-section {
  .course-section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  ::v-deep .el-tree-node__content {
    height: auto;
  }
  .inner {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
}
</style>
