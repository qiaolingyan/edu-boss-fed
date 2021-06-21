<template>
  <div class="course-update">
    <create-update is-edit
                   :course-id="courseId" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateUpdate from './components/create-update.vue'
export default Vue.extend({
  name: 'CourseUpdate',
  components: {
    CreateUpdate
  },
  props: {
    courseId: {
      type: [Number, String],
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
