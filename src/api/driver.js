import request from '@/utils/request'

// 获取驾驶员数据，col以对象的形式存在
export function getDrivers(col) {
  return request({
    url: '/drivers',
    method: 'get',
    params: { col }
  })
}

export function updateDrivers(data) {
  return request({
    url: '/drivers/update',
    method: 'post',
    data
  })
}
