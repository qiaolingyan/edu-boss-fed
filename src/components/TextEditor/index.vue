<template>
  <div ref="editor"
       class="text-editor">

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import E from 'wangeditor'
import { upload } from '@/services/course'
export default Vue.extend({
  name: 'TextEditor',
  model: {
    prop: 'text',
    event: 'update'
  },
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  // 组件已经渲染好，可以初始化操作 dom 了
  mounted() {
    this.initEditor()
  },
  methods: {
    initEditor() {
      const editor = new E(this.$refs.editor as any)
      // 配置 onchange 回调函数,事件监听需在 初始化实例之前
      editor.config.onchange = (newHtml: any) => {
        this.$emit('update', newHtml)
      }

      // 自定义上传图片
      editor.config.customUploadImg = async function(
        resultFiles: any,
        insertImgFn: any
      ) {
        // resultFiles 是 input 中选中的文件列表
        // insertImgFn 是获取图片 url 后，生成 img 标签插入到编辑器的方法
        // insertImgFn(imgUrl)
        const fd = new FormData()
        fd.append('file', resultFiles[0])
        const { data } = await upload(fd)
        if (data.code === '000000') {
          insertImgFn(data.data.name)
        }
      }

      editor.create()

      // 设置初始值需要在初始化实例之后
      editor.txt.html(this.text)
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
