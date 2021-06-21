/**
 * 阿里云上传相关请求模块
*/

import request from '@/utils/request'

export const getAliyunImagUploadAddressAdnAuth = () => {
  return request({
    method: 'GET',
    url: '/boss/course/upload/aliyunImagUploadAddressAdnAuth.json'
  })
}

export const getAliyunVideoUploadAddressAdnAuth = (params: any) => {
  return request({
    method: 'GET',
    url: '/boss/course/upload/aliyunVideoUploadAddressAdnAuth.json',
    params
    // params:{
    //   fileName:'',
    //   imageUrl:''
    // }
  })
}

export const aliyunTransCode = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/course/upload/aliyunTransCode.json',
    data
  })
}

export const aliyunTransCodePercent = (lessonId: any) => {
  return request({
    method: 'GET',
    url: '/boss/course/upload/aliyunTransCodePercent.json',
    params: {
      lessonId
    }
  })
}

export const getMediaByLessonId = (lessonId: string | number) => {
  return request({
    method: 'GET',
    url: '/boss/course/upload/getMediaByLessonId.json',
    params: {
      lessonId
    }
  })
}

export const refreshAliyunVideoUploadAddressAdnAuth = (videoId: string | number) => {
  return request({
    method: 'GET',
    url: '/boss/course/upload/refreshAliyunVideoUploadAddressAdnAuth.json',
    params: {
      videoId
    }
  })
}
