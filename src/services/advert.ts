/**
 * 广告相关请求模块
*/

import request from '@/utils/request'
// 根据Id获取广告信息
export const getAdById = (id: any) => {
  return request({
    method: 'GET',
    url: '/front/ad/getAdById',
    params: {
      id
    }
  })
}
// 获取所有的广告列表
export const getAdList = () => {
  return request({
    method: 'GET',
    url: '/front/ad/getAdList'
  })
}
// 获取所有的广告位及其对应的广告
export const getAllAds = (spaceKeys: any) => {
  return request({
    method: 'GET',
    url: '/front/ad/getAllAds',
    params: {
      spaceKeys
    }
  })
}

// 新增或者修改广告信息
export const saveOrUpdate = (data: any) => {
  return request({
    method: 'POST',
    url: '/front/ad/saveOrUpdate',
    data
  })
}

// 新增或者修改广告信息
export const upload = (data: any, onUploadProgress?: (progressEvent: ProgressEvent) => void) => {
  return request({
    method: 'POST',
    url: '/front/upload/img',
    data,
    // HTML5新增的上传响应事件 : progress
    onUploadProgress
  })
}

// 获取所有的广告位
export const getAllSpaces = () => {
  return request({
    method: 'GET',
    url: '/front/ad/space/getAllSpaces'
  })
}

// 根据Id获取广告位
export const getSpaceById = (id: any) => {
  return request({
    method: 'GET',
    url: '/front/ad/space/getSpaceById',
    params: {
      id
    }
  })
}

// 新增或者修改广告位
export const saveOrUpdateSpace = (data: any) => {
  return request({
    method: 'POST',
    url: '/front/ad/space/saveOrUpdate',
    data
  })
}

// 更新广告的状态
export const updateStatus = (data: any) => {
  return request({
    method: 'POST',
    url: '/front/ad/updateStatus',
    data
  })
}
