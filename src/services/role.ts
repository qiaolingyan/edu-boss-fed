/**
 * 角色相关请求模块
*/

import request from '@/utils/request'

export const getAllRole = () => {
  return request({
    method: 'GET',
    url: '/boss/role/all'
  })
}

export const allocateUserRoles = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/role/allocateUserRoles',
    data
  })
}

interface RolePages {
  name: string
}
export const getRolePages = (data: RolePages) => {
  return request({
    method: 'POST',
    url: '/boss/role/getRolePages',
    data
  })
}

export const getRolesWithUserPermission = (userId: number) => {
  return request({
    method: 'GET',
    url: '/boss/role/getRolesWithUserPermission',
    params: {
      userId
    }
  })
}

export const saveOrUpdate = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/role/saveOrUpdate',
    data
  })
}

export const getUserRoles = (userId: number | string) => {
  return request({
    method: 'GET',
    url: `/boss/role/user/${userId}`
  })
}

export const getRole = (id: number) => {
  return request({
    method: 'GET',
    url: `/boss/role/${id}`
  })
}

export const deleteRoles = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/boss/role/${id}`
  })
}
