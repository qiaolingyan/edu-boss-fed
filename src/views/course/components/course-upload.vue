<!--
1. 组件需要根据绑定的数据进行图片预览
2. 组件需要把上传成功的图片地址同步到绑定的数据中
v-model 的本质还是父子组件通信
 给子组件传递一个 value 的数据
 默认监听 input 事件，修改绑定的数据
-->

<template>
  <div class="course-upload">
    <el-progress v-if="isUploading"
                 type="circle"
                 :percentage="percentage"
                 :width="178"
                 :status="percentage === 100 ? 'success' : undefined">
    </el-progress>
    <el-upload v-else
               class="avatar-uploader"
               action="/boss/course/upload"
               :http-request="handleUpload"
               :show-file-list="false"
               :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl"
           :src="imageUrl"
           class="avatar">
      <i v-else
         class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { upload } from '@/services/course'
export default Vue.extend({
  name: 'CourseUpload',
  model: {
    prop: 'imageUrl',
    event: 'update'
  },
  props: {
    imageUrl: {
      type: String
    },
    limit: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      isUploading: false,
      percentage: 0
    }
  },
  methods: {
    beforeAvatarUpload(file: any) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < this.limit

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error(`上传头像图片大小不能超过 ${this.limit}MB!`)
      }
      return isJPG && isLt2M
    },
    async handleUpload(options: any) {
      try {
        this.isUploading = true
        const fd = new FormData()
        fd.append('file', options.file)
        const { data } = await upload(fd, e => {
          this.percentage = Math.floor((e.loaded / e.total) * 100)
        })
        if (data.code === '000000') {
          this.$emit('update', data.data.name)
        }
        this.isUploading = false
        this.percentage = 0
      } catch (e) {
        this.isUploading = false
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.course-upload {
  ::v-deep .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  ::v-deep .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
