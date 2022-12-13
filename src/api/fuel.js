import request from '@/utils/request'

// 获取驾驶员数据，col以对象的形式存在
export function getFuel(col) {
  return request({
    url: '/fuel',
    method: 'get',
    params: { col }
  })
}

export function updateFuel(data) {
  return request({
    url: '/fuel/update',
    method: 'post',
    data
  })
}
