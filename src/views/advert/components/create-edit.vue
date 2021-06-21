<template>
  <div class="create-edit">
    <el-form ref="form"
             :model="advert"
             label-width="100px">
      <el-form-item label="广告名称">
        <el-input v-model="advert.name"></el-input>
      </el-form-item>
      <el-form-item label="广告位置">
        <el-select v-model="advert.spaceId"
                   placeholder="请选择活动区域">
          <el-option v-for="advert in advertSpaces"
                     :key="advert.id"
                     :label="advert.name"
                     :value="advert.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-date-picker v-model="advert.startTime"
                        type="datetime"
                        placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="到期时间">
        <el-date-picker v-model="advert.endTime"
                        type="datetime"
                        placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="上线/下线">
        <el-radio-group v-model="advert.status">
          <el-radio :label="1">上线</el-radio>
          <el-radio :label="0">下线</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="广告图片">
        <el-progress v-if="isUploading"
                     type="circle"
                     :percentage="percentage"
                     :width="178"
                     :status="percentage === 100 ? 'success' : undefined">
        </el-progress>
        <el-upload v-else
                   class="avatar-uploader"
                   action="/front/upload/img"
                   :http-request="handleUpload"
                   :show-file-list="false"
                   :before-upload="beforeAvatarUpload">
          <img v-if="advert.img"
               width="100%"
               class="avatar"
               :src="advert.img"
               alt="">
          <i v-else
             class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

      </el-form-item>
      <el-form-item label="广告链接">
        <el-input type="text"
                  v-model="advert.link"></el-input>
      </el-form-item>
      <el-form-item label="广告备注">
        <el-input type="textarea"
                  v-model="advert.text"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  saveOrUpdate,
  upload,
  getAllSpaces,
  getAdById
} from '@/services/advert'
export default Vue.extend({
  name: 'CreateEdit',
  props: {
    isEdit: {
      type: Boolean
    }
  },
  data() {
    return {
      advert: {
        name: '',
        spaceId: null,
        text: '',
        img: '',
        link: '',
        startTime: '',
        endTime: '',
        status: 0
      },
      limit: 2,
      isUploading: false,
      percentage: 0,
      advertSpaces: []
    }
  },
  created() {
    this.getAllSpaces()
    if (this.isEdit) {
      this.getAdById()
    }
  },
  methods: {
    async getAdById() {
      const { data } = await getAdById(this.$route.query.id)
      if (data.state === 1) {
        this.advert = data.content
      }
    },
    async getAllSpaces() {
      const { data } = await getAllSpaces()
      if (data.state === 1) {
        this.advertSpaces = data.content
      }
    },
    async onSubmit() {
      const { data } = await saveOrUpdate(this.advert)
      if (data.state === 1) {
        this.$message.success('添加成功')
        this.$router.back()
      }
    },
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
        if (data.state === 1) {
          this.advert.img = data.content.name
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
.create-edit {
  background-color: #ffffff;
  padding: 20px;
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
