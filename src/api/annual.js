import request from '@/utils/request'

// 获取驾驶员数据，col以对象的形式存在
export function getAnnual(col) {
  return request({
    url: '/annual',
    method: 'get',
    params: { col }
  })
}

export function updateAnnual(data) {
  return request({
    url: '/annual/update',
    method: 'post',
    data
  })
}
