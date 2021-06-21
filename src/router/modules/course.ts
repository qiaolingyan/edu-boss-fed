// src\router\modules\course.ts
import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes: RouteConfig = {
  path: '/Courses',
  component: Layout,
  meta: {
    title: '课程管理',
    requiresAuth: true
  },
  children: [
    {
      path: '/Courses',
      name: 'Courses',
      component: () => import(/* webpackChunkName: 'course' */ '@/views/course/index.vue')
    },
    {
      path: '/course/create',
      name: 'course-create',
      component: () => import(/* webpackChunkName: 'course-create' */ '@/views/course/create.vue'),
      meta: {
        title: '创建课程'
      }
    },
    {
      path: '/course/:courseId/edit',
      name: 'course-update',
      component: () => import(/* webpackChunkName: 'course-update' */ '@/views/course/update.vue'),
      props: true,
      meta: {
        title: '编辑课程'
      }
    },
    {
      path: '/course/:courseId/section',
      name: 'course-section',
      component: () => import(/* webpackChunkName: 'course-section' */ '@/views/course/section.vue'),
      props: true,
      meta: {
        title: '课时管理'
      }
    },
    {
      path: '/course/:courseId/video',
      name: 'course-video',
      component: () => import(/* webpackChunkName: 'course-video' */ '@/views/course/video.vue'),
      props: true,
      meta: {
        title: '视频上传'
      }
    }
  ]
}

export default routes
