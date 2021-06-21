// src\router\modules\advert.ts

import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes: RouteConfig = {
  path: '/Advertise',
  component: Layout,
  meta: {
    title: '广告管理',
    requiresAuth: true,
    redirect: false
  },
  children: [
    {
      path: '/Advertise',
      name: 'Advertise',
      component: () => import(/* webpackChunkName: 'advert' */ '@/views/advert/index.vue'),
      meta: {
        title: '广告列表'
      }
    },
    {
      path: '/AdvertiseSpace',
      name: 'AdvertiseSpace',
      component: () => import(/* webpackChunkName: 'advert-space' */ '@/views/advert-space/index.vue'),
      meta: {
        title: '广告位列表'
      }
    },
    {
      path: '/addAdvertise',
      name: 'addAdvertise',
      component: () => import(/* webpackChunkName: 'addAdvertise' */ '@/views/advert/create.vue'),
      meta: {
        title: '添加广告'
      }
    },
    {
      path: '/updateAdvertise',
      name: 'updateAdvertise',
      component: () => import(/* webpackChunkName: 'updateAdvertise' */ '@/views/advert/edit.vue'),
      meta: {
        title: '编辑广告'
      }
    }
  ]
}

export default routes
