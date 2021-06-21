
// src\router\index.ts

import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './modules'
import store from '@/store/index.ts'

Vue.use(VueRouter)

// 解决编程式路由往同一地址跳转时会报错的情况
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace

// push
const a = (VueRouter as any).prototype.push = function push(location: any, onResolve: any, onReject: any) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return (originalPush.call(this, location) as any).catch((err: any) => err)
}
// replace
const b = (VueRouter as any).prototype.replace = function push(location: any, onResolve: any, onReject: any) {
  if (onResolve || onReject) {
    return originalReplace.call(this, location, onResolve, onReject)
  }
  return (originalReplace.call(this, location) as any).catch((err: any) => err)
}

const router = new VueRouter({
  routes
})

// 访问需要登录的页面时，判断有没有登录状态
// 全局前置守卫
router.beforeEach(async (to, from, next) => {
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

    // 校验页面访问权限
    const { content: { menuList } } = await store.dispatch('getUserPermissions')
    const role = to.meta.role
    for (let i = 0; i < menuList.length; i++) {
      const item = menuList[i]
      if (item.href === role) {
        // 生成权限菜单
        return next()
      }
      if (item.subMenuList) {
        for (let j = 0; j < item.subMenuList.length; j++) {
          const subItem = item.subMenuList[j]
          if (subItem.href === role) {
            // 生成权限菜单
            return next()
          }
        }
      }
    }
    // 没有权限跳转403 页面
    // return next('/permission-denied')
  }

  next() // 允许通过
})

export default router
