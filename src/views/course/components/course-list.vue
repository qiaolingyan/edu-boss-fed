<template>
  <div class="course-list">
    <el-form :inline="true"
             :model="courseForm"
             class="demo-form-inline">
      <el-form-item label="课程名称">
        <el-input v-model="courseForm.courseName"
                  placeholder="课程名称"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="courseForm.status"
                   placeholder="请选择">
          <el-option label="全部"
                     value=""></el-option>
          <el-option v-for="item in statusList"
                     :key="item.value"
                     :label="item.name"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleSearch">查询</el-button>
      </el-form-item>
      <el-form-item style="float:right;">
        <el-button type="primary"
                   icon="el-icon-plus"
                   @click="$router.push({
                     name:'course-create'
                   })">新建课程</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="isLoading"
              :data="courses"
              border
              style="width: 100%">
      <el-table-column prop="id"
                       label="ID"
                       min-width="150">
      </el-table-column>
      <el-table-column prop="courseName"
                       label="课程名称"
                       min-width="150">
      </el-table-column>
      <el-table-column prop="price"
                       label="价格"
                       min-width="150">
      </el-table-column>
      <el-table-column prop="sortNum"
                       label="排序"
                       min-width="150">
      </el-table-column>
      <el-table-column prop="status"
                       label="状态"
                       min-width="100">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status"
                     :active-value="1"
                     :inactive-value="0"
                     :disabled="scope.row.isStatusLoading"
                     active-color="#13ce66"
                     inactive-color="#ff4949"
                     @change="statusChange(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       min-width="150">
        <template slot-scope="scope">
          <el-button @click="$router.push({
                        name:'course-update',
                        params:{
                          courseId:scope.row.id
                        }
                      })"
                     type="text"
                     size="small">编辑</el-button>
          <el-button @click="$router.push({
                        name:'course-section',
                        params:{
                          courseId:scope.row.id
                        }
                      })"
                     type="text"
                     size="small">内容管理</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="courseForm.currentPage"
                   :page-sizes="[10, 20, 30, 40]"
                   :page-size="courseForm.pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="totalCount">
    </el-pagination>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getQueryCourses, changeState } from '@/services/course'
export default Vue.extend({
  name: 'CourseList',
  data() {
    return {
      courses: [],
      courseForm: {
        courseName: 'q-test',
        status: '',
        currentPage: 1,
        pageSize: 10
      },
      totalCount: 0,
      isLoading: false,
      statusList: [
        { value: 0, name: '下架' },
        { value: 1, name: '上架' }
      ]
    }
  },
  created() {
    this.handleSearch()
  },
  methods: {
    async handleSearch() {
      this.isLoading = true
      const { data } = await getQueryCourses(this.courseForm)
      if (data.code === '000000') {
        data.data.records.forEach((item: any) => {
          item.isStatusLoading = false
        })
        this.courses = data.data.records
        this.totalCount = data.data.total
        this.isLoading = false
      }
    },
    handleSizeChange(val: number) {
      this.courseForm.pageSize = val
      this.courseForm.currentPage = 1
      this.handleSearch()
    },
    handleCurrentChange(val: number) {
      this.courseForm.currentPage = val
      this.handleSearch()
    },
    async statusChange(course: any) {
      course.isStatusLoading = true
      const { data } = await changeState({
        courseId: course.id,
        status: course.status
      })
      if (data.code === '000000') {
        this.$message.success(`${course.status === 0 ? '下架' : '上架'}成功`)
        course.isStatusLoading = false
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.course-list {
  .el-select {
    width: 100%;
  }
  .status {
    display: inline-block;
    cursor: pointer;
    width: 0.875rem;
    height: 0.875rem;
    vertical-align: middle;
    border-radius: 50%;
    &.status-success {
      background: #51cf66;
    }
    &.status-fail {
      background: red;
    }
  }
}
</style>
