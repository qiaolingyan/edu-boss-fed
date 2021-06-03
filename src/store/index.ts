import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 类型警告报错
    user: JSON.parse(window.localStorage.getItem('user') || 'null') // 当前登录状态
  },
  mutations: {
    setUser(state, payload) {
      state.user = JSON.parse(payload)

      // 数据持久化，为了防止页面刷新数据丢失，存放到本地存储
      // 本地存储只能存放 字符串
      window.localStorage.setItem('user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
