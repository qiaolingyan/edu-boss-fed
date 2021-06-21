<template>
  <div class="course-create">
    <create-update />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateUpdate from './components/create-update.vue'
export default Vue.extend({
  name: 'CourseCreate',
  components: {
    CreateUpdate
  }
})
</script>

<style lang="scss" scoped>
</style>
