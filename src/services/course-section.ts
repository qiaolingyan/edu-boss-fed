/**
 * 课程章节相关请求模块
*/

import request from '@/utils/request'

export const getSectionAndLesson = (courseId: number | string) => {
  return request({
    method: 'GET',
    url: '/boss/course/section/getSectionAndLesson',
    params: {
      courseId
    }
  })
}

export const saveOrUpdateSection = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/course/section/saveOrUpdateSection',
    data
  })
}

export const getBySectionId = (sectionId: number | string) => {
  return request({
    method: 'GET',
    url: '/boss/course/section/getBySectionId',
    params: {
      sectionId
    }
  })
}

export const saveOrUpdate = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/course/lesson/saveOrUpdate',
    data
  })
}

export const getById = (lessonId: number | string) => {
  return request({
    method: 'POST',
    url: '/boss/course/lesson/getById',
    params: {
      lessonId
    }
  })
}
