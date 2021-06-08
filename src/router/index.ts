import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
import store from '@/store/index.ts'

Vue.use(VueRouter)

// 路由配置规则
const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName:'login' */ '@/views/login/index.vue')
  },
  {
    path: '/',
    component: Layout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        // 默认子路由，匹配到 / 时会默认渲染这个组件
        path: '',
        name: 'home',
        // 通过注释起个别名
        component: () => import(/* webpackChunkName:'home' */ '@/views/home/index.vue')
      },
      {
        path: '/role',
        name: 'role',
        component: () => import(/* webpackChunkName:'role' */ '@/views/role/index.vue')
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import(/* webpackChunkName:'menu' */ '@/views/menu/index.vue')
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import(/* webpackChunkName:'resource' */ '@/views/resource/index.vue')
      },
      {
        path: '/course',
        name: 'course',
        component: () => import(/* webpackChunkName:'course' */ '@/views/course/index.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName:'user' */ '@/views/user/index.vue')
      },
      {
        path: '/advert',
        name: 'advert',
        component: () => import(/* webpackChunkName:'advert' */ '@/views/advert/index.vue')
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: () => import(/* webpackChunkName:'advert-space' */ '@/views/advert-space/index.vue')
      },
      {
        path: '/menu/create',
        name: 'menu-create',
        component: () => import(/* webpackChunkName:'menu-create-edit' */ '@/views/menu/create.vue')
      },
      {
        path: '/menu/:id/edit',
        name: 'menu-edit',
        component: () => import(/* webpackChunkName:'menu-create-edit' */ '@/views/menu/edit.vue')
      },
      {
        path: '/resource/category',
        name: 'resource-category',
        component: () => import(/* webpackChunkName:'resource-category' */ '@/views/resource/category.vue')
      },
      {
        path: '/role/:roleId/allocMenu',
        name: 'role-allocMenu',
        props: true, // 将路由路径参数映射到组件的 props 数据中
        component: () => import(/* webpackChunkName:'role-allocMenu' */ '@/views/role/alloc-menu.vue')
      },
      {
        path: '/role/:roleId/allocResource',
        name: 'role-allocResource',
        component: () => import(/* webpackChunkName:'role-allocResource' */ '@/views/role/alloc-resource.vue')
      },
      {
        path: '/course/edit',
        name: 'course-edit',
        component: () => import(/* webpackChunkName:'course-edit' */ '@/views/course/edit.vue')
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName:'404' */ '@/views/error-page/404.vue')
  }
]

const router = new VueRouter({
  routes
})

// 访问需要登录的页面时，判断有没有登录状态
// 全局前置守卫
router.beforeEach((to, from, next) => {
  // to.matched 是一个数组（匹配到的路由记录）
  // 判断匹配到的路由是否需要登录权限，只要一个匹配到就是，因父路由需要的话子路由也需要
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 判断登录状态
    if (!store.state.user) {
      next({
        name: 'login',
        // 通过 url 传递查询字符串参数
        query: {
          redirect: to.fullPath // 把登录成功需要返回的页面告诉登录页面
        }
      })
    }
  }
  next() // 允许通过
})

export default router
