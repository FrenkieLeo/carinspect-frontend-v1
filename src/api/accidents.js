import request from '@/utils/request'

// 获取驾驶员数据，col以对象的形式存在
export function getAccidents(col) {
  return request({
    url: '/accidents',
    method: 'get',
    params: { col }
  })
}

export function updateAccidents(data) {
  return request({
    url: '/accidents/update',
    method: 'post',
    data
  })
}
