/**
 * 用户相关请求模块
*/

import request from '@/utils/request'
import qs from 'qs'

interface User {
  phone: string
  password: string
}

export const login = (data: User) => {
  return request({
    method: 'POST',
    url: '/front/user/login',
    // qs 转化参数后，axios 会自动将请求格式设置为 x-www-form-urlencoded，所以不需要在设置 headers 的 content-type，key=value&key=value
    // 不用 qs 转化，axios 默认发送的类型是 application/json {key:value,key:value}
    // 如果 data 是 formData 对象，则 content-type 是 multipart/form-data
    data: qs.stringify(data)
    // headers: {
    //   'content-type': 'application/x-www-form-urlencoded'
    // }
  })
}

export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/front/user/getInfo'
  })
}
