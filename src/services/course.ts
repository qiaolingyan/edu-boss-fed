/**
 * 课程相关请求模块
*/

import request from '@/utils/request'

export const changeState = (data: any) => {
  return request({
    method: 'GET',
    url: '/boss/course/changeState',
    params: data
  })
}

export const getCourseById = (courseId: number | string) => {
  return request({
    method: 'GET',
    url: '/boss/course/getCourseById',
    params: {
      courseId
    }
  })
}

export const getQueryCourses = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/course/getQueryCourses',
    data
  })
}

export const saveOrUpdateCourse = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/course/saveOrUpdateCourse',
    data
  })
}

export const upload = (data: any, onUploadProgress?: (progressEvent: ProgressEvent) => void) => {
  // 该接口要求的请求数据类型是 multipart/form-data
  // 所以需要提交 FormData 数据对象
  return request({
    method: 'POST',
    url: '/boss/course/upload',
    data,
    // HTML5新增的上传响应事件 : progress
    onUploadProgress
  })
}
