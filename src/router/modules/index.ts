// src\router\modules\index.ts
import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
import courseRoutes from './course'
import userRoutes from './user'
import advertRoutes from './advert'
import rightsRoutes from './rights'
/**
 * 不需要权限的公共路由
 */
const constantRoutes: Array<RouteConfig> = [
  {
    path: '/',
    component: Layout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import(/* webpackChunkName: 'home' */ '@/views/home/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */ '@/views/login/index.vue'),
    meta: {
      hidden: true
    }
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: '404' */ '@/views/error-page/404.vue'),
    meta: {
      hidden: true
    }
  },
  {
    path: '/permission-denied',
    name: 'PermissionDenied',
    component: () => import(/* webpackChunkName: 'common' */ '@/views/error-page/403.vue')
  }
]

/**
 * 需要根据用户角色动态加载的权限路由
 */
export const asyncRoutes: Array<RouteConfig> = [
  courseRoutes,
  userRoutes,
  advertRoutes,
  rightsRoutes
  // resourceRoutes,
  // roleRoutes,
  // menuRoutes
]

const routes: Array<RouteConfig> = [
  ...constantRoutes,
  ...asyncRoutes
]

export default routes
