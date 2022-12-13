import request from '@/utils/request'

// 获取驾驶员数据，col以对象的形式存在
export function getVehicles(col) {
  return request({
    url: '/vehicles',
    method: 'get',
    params: { col }
  })
}

export function updateVehicles(data) {
  return request({
    url: '/vehicles/update',
    method: 'post',
    data
  })
}
