<template>
  <div class="course-video">
    <el-form ref="form"
             :model="form"
             label-width="100px">
      <el-form-item label="课程">
        <el-input disabled
                  v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="课时">
        <el-input disabled
                  v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="视频上传">
        <input ref="videoFile"
               type="file">
      </el-form-item>
      <el-form-item label="封面上传">
        <input ref=imageFile
               type="file">
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="handleUpload">开始上传</el-button>

        <el-button>返回</el-button>
      </el-form-item>
      <el-form-item>
        <p>视频上传中：{{uploadPercent}}</p>
        <p v-if="isUploadSuccess">视频转码中：{{isTransCodeSuccess ? '完成' : '正在处理'}}</p>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  getAliyunImagUploadAddressAdnAuth,
  getAliyunVideoUploadAddressAdnAuth,
  aliyunTransCode,
  aliyunTransCodePercent
} from '@/services/course-aliyun'
export default Vue.extend({
  name: 'CourseVideo',
  data() {
    return {
      form: {
        name: ''
      },
      uploader: null,
      imageUrl: '',
      videoId: null,
      uploadPercent: 0,
      isUploadSuccess: false,
      isTransCodeSuccess: false
    }
  },
  computed: {
    video() {
      return this.$refs.videoFile
    },
    image() {
      return this.$refs.imageFile
    }
  },
  created() {
    this.initUploader()
  },
  methods: {
    initUploader() {
      this.uploader = new window.AliyunUpload.Vod({
        // 阿里账号ID，必须有值
        userId: '1618139964448548',
        // 上传到视频点播的地域，默认值为'cn-shanghai'，//eu-central-1，ap-southeast-1
        region: '',
        // 分片大小默认1 MB，不能小于100 KB
        partSize: 1048576,
        // 并行上传分片个数，默认5
        parallel: 5,
        // 网络原因失败时，重新上传次数，默认为3
        retryCount: 3,
        // 网络原因失败时，重新上传间隔时间，默认为2秒
        retryDuration: 2,
        // 开始上传
        onUploadstarted: async (uploadInfo: any) => {
          // 1.通过我们的后端获取文件上传凭证
          let uploaderAddressAndAuth
          if (uploadInfo.isImage) {
            // 获取图片上传凭证
            const { data } = await getAliyunImagUploadAddressAdnAuth()
            if (data.code === '000000') {
              uploaderAddressAndAuth = data.data
              this.imageUrl = data.data.imageUrl
            }
          } else {
            // 获取视频上传凭证
            const { data } = await getAliyunVideoUploadAddressAdnAuth({
              fileName: uploadInfo.file.name,
              imageUrl: this.imageUrl // 请确保一定是先上传图片获取到 imageUrl
            })
            if (data.code === '000000') {
              uploaderAddressAndAuth = data.data
              this.videoId = uploaderAddressAndAuth.videoId
            }
          }

          // 2.调用 uploader.setUploadAuthAndAddress 设置上传凭证
          // 3.设置好上传凭证确认没有问题，上传进度开始
          // setUploadAuthAndAddress(uploadFileInfo, uploadAuth, uploadAddress,videoId)
          const a = (this.uploader as any).setUploadAuthAndAddress(
            uploadInfo,
            uploaderAddressAndAuth.uploadAuth,
            uploaderAddressAndAuth.uploadAddress,
            uploaderAddressAndAuth.imageId || uploaderAddressAndAuth.videoId
          )
        },
        // 文件上传成功
        onUploadSucceed: function(uploadInfo: any) {
          console.log('onUploadSucceed', uploadInfo)
        },
        // 文件上传失败
        onUploadFailed: function(uploadInfo: any, code: any, message: any) {
          console.log('onUploadFailed', uploadInfo, code, message)
        },
        // 文件上传进度，单位：字节
        onUploadProgress: async (
          uploadInfo: any,
          totalSize: any,
          loadedPercent: any
        ) => {
          if (!uploadInfo.isImage) {
            this.uploadPercent = Math.floor(loadedPercent * 100)
          }
        },
        // 上传凭证或STS token超时
        onUploadTokenExpired: function(uploadInfo: any) {
          console.log('onUploadTokenExpired', uploadInfo)
        },
        // 全部文件上传结束
        onUploadEnd: async (uploadInfo: any) => {
          this.isUploadSuccess = true
          // 转码
          const { data } = await aliyunTransCode({
            lessonId: this.$route.query.lessonId,
            coverImageUrl: this.imageUrl,
            fileName: (this.video as any).files[0].name,
            fileId: this.videoId
          })
          // 轮询查询转码进度
          const timer = setInterval(async () => {
            const { data } = await aliyunTransCodePercent(
              this.$route.query.lessonId
            )
            if (data.data === 100) {
              window.clearInterval(timer)
              this.isTransCodeSuccess = true
            }
          }, 3000)
        }
      })
    },
    handleUpload() {
      // 初始化状态
      this.isUploadSuccess = false
      this.isTransCodeSuccess = false
      this.uploadPercent = 0
      // 获取上传的文件
      const videoFile = (this.video as any).files[0]
      const imageFile = (this.image as any).files[0]
      console.log(videoFile, imageFile)

      const uploader = this.uploader as any

      // 将用户选的文件添加到上传文件
      // 一旦开始上传就会按照列表中添加的顺序开始上传
      uploader.addFile(imageFile, null, null, null, '{"Vod":{}}')
      uploader.addFile(videoFile, null, null, null, '{"Vod":{}}')

      // 开始上传，触发 onUploadstarted 事件
      uploader.startUpload()
    }
  }
})
</script>

<style lang="scss" scoped>
.course-video {
  padding: 40px;
}
</style>
