import Vue from 'vue'
import Vuex from 'vuex'

import { getUserPermissions, getUserInfo } from '@/services/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 类型警告报错
    user: JSON.parse(window.localStorage.getItem('user') || 'null'), // 当前登录状态
    menuList: [], // 权限菜单
    resourceList: [] // 权限资源
  },
  mutations: {
    setUser(state, payload) {
      state.user = JSON.parse(payload)

      // 数据持久化，为了防止页面刷新数据丢失，存放到本地存储
      // 本地存储只能存放 字符串
      window.localStorage.setItem('user', payload)
    },
    SET_MENU_LIST(state, payload) {
      state.menuList = payload
    },
    SET_RESOURCELIST_LIST(state, payload) {
      state.resourceList = payload
    }
  },
  actions: {
    async getUserPermissions({ commit }) {
      const { data } = await getUserPermissions()
      commit('SET_MENU_LIST', data.content.menuList)
      commit('SET_RESOURCELIST_LIST', data.content.resourceList)
      return data
    }
  },
  modules: {
  }
})
