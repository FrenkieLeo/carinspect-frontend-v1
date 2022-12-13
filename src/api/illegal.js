import request from '@/utils/request'

// 获取驾驶员数据，col以对象的形式存在
export function getIllegal(col) {
  return request({
    url: '/illegal',
    method: 'get',
    params: { col }
  })
}

export function updateIllegal(data) {
  return request({
    url: '/illegal/update',
    method: 'post',
    data
  })
}
