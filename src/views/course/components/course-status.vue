<template>
  <div class="course-status">
    <div class="header">
      <i class="el-icon-info"></i>
      <span>当前状态：{{form.status === 0 ? '已隐藏' : (form.status === '1' ? '待更新' : '已更新')}}</span>
    </div>
    <el-form ref="form"
             :model="form"
             label-width="100px">
      <el-form-item label="状态变更为">
        <el-select v-model="form.status">
          <el-option v-for="item in statusOptions"
                     :key="item.value"
                     :value="item.value"
                     :label="item.name"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'CourseStatus',
  props: {
    form: {
      type: Object
    }
  },
  data() {
    return {
      statusOptions: [
        { value: 0, name: '已隐藏' },
        { value: 1, name: '待更新' },
        { value: 2, name: '已更新' }
      ]
    }
  }
})
</script>

<style lang="scss" scoped>
.el-select {
  width: 100%;
}
.header {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
  i {
    display: block;
    margin-bottom: 20px;
    font-size: 50px;
  }
  span {
    display: block;
    font-size: 20px;
  }
}
</style>
