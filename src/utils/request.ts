import axios from 'axios'
import qs from 'qs'
import store from '@/store'
import router from '@/router'
import { Message, MessageBox } from 'element-ui'

const request = axios.create({
  // 配置选项
  // baseURL
  // timeout
})

function redirectLogin() {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

function refreshToken() {
  return axios.create()({
    method: 'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      refreshtoken: store.state.user.refresh_token
    })
  })
}

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 改写 config 配置信息来实现业务功能的统一处理
  const { user } = store.state
  if (user && user.access_token) {
    config.headers = {
      Authorization: user.access_token
    }
  }

  // 一定要返回 config,否则请求发不出去了
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
let isRefreshing = false // 控制刷新 token 的状态
let requests: any[] = [] // 存储刷新 token 期间过来的请求
request.interceptors.response.use(function (response) {
  // 状态码为 2xx
  // 如果是自定义状态码，错误处理就写到这里
  /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
  // const res = response.data
  // console.log(response, res)
  // if (res.code !== '000000') {
  //   Message({
  //     message: res.data,
  //     type: 'error',
  //     duration: 5 * 1000
  //   })

  //   // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //     MessageBox.confirm(
  //       '你已被登出，可以取消继续留在该页面，或者重新登录',
  //       '确定登出',
  //       {
  //         confirmButtonText: '重新登录',
  //         cancelButtonText: '取消',
  //         type: 'warning'
  //       }
  //     ).then(() => {
  //       store.dispatch('FedLogOut').then(() => {
  //         location.reload() // 为了重新实例化vue-router对象 避免bug
  //       })
  //     })
  //   }
  //   // return Promise.reject('error)
  // } else {
  //   return response
  // }
  return response
}, async function (error) {
  // 超出 2xx 状态码
  // 如果是 HTTP 状态码，错误处理就写到这里

  if (error.response) { // 请求收到响应了，但是状态码 超出 2xx
    // const errMsgObj = {
    //   '400': '请求参数错误',
    //   '401': '',
    //   '403': '',
    //   '404': '',
    //   '500': ''
    // }
    // let { status } = error.response
    // status = status + ''
    // Message.error(errMsgObj[status])
    const { status } = error.response
    if (status === 400) {
      Message.error('请求参数错误')
    } else if (status === 401) {
      // token 无效(没有，过期，无效)
      // 如果有 refresh_token ,则使用refresh_token获取新的 access_token
      // 成功了 -> 把本次失败的请求重新发出去
      // 失败了 -> 跳转登录页面重新登录获取新的 token
      // 没有，则直接跳转登录页面
      if (!store.state.user) {
        redirectLogin()
        return Promise.reject(error)
      }

      // 目前没有在刷新 token ,则尝试刷新 token
      if (!isRefreshing) {
        isRefreshing = true // 开启刷新状态
        // 刷新 token
        return refreshToken().then(res => {
          if (!res.data.success) {
            // 失败
            throw new Error('刷新 Token 失败')
          }
          // 成功了 -> 更新新的token,把本次失败的请求重新发出去
          store.commit('setUser', res.data.content)
          // error.config -> 失败请求的配置信息
          // 把 requests 数组队列中的请求重新发出去
          requests.forEach(cb => cb())
          // 重置 requests 数组
          requests = []
          return request(error.config)
        }).catch(error => {
          // 失败了 -> 清除当前用户登录状态，跳转登录页面
          store.commit('setUser', null)
          redirectLogin()
          return Promise.reject(error)
        }).finally(() => {
          isRefreshing = false // 重置刷新状态
        })
      }

      // 刷新状态下，把请求挂起，放到 requests 数组中
      return new Promise(resolve => {
        requests.push(() => {
          resolve(request(error.config))
        })
      })
    } if (status === 403) {
      Message.error('没有权限，请联系管理员')
    } if (status === 404) {
      Message.error('请求资源不存在')
    } if (status >= 500) {
      Message.error('服务端错误，请联系管理员')
    }
  } else if (error.request) { // 请求发出去了，但是没有收到响应
    Message.error('请求超时，请刷新重试')
  } else { // 请求的时候设置请求时发生了一些事情，触发了错误
    Message.error(`请求失败：${error.message}`)
  }
  // 请求失败的错误对象抛出，扔给上一个调用者
  return Promise.reject(error)
})

export default request
