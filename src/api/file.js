import request from '@/utils/request'

// 获取驾驶员数据，col以对象的形式存在
export function uploadFile(data) {
  return request({
    url: '/file',
    method: 'post',
    data
  })
}

export function getLinkAndUpload(data) {
  return request({
    url: '/file/uploadFile',
    method: 'post',
    data
  })
}

export function getFileInfo(data) {
  return request({
    url: '/file/getFileInfo',
    method: 'post',
    data
  })
}

export function deleteFile(data) {
  return request({
    url: '/file/deleteFile',
    method: 'post',
    data
  })
}

