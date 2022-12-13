import request from '@/utils/request'

// 获取驾驶员数据，col以对象的形式存在
export function getMaintenance(col) {
  return request({
    url: '/maintenance',
    method: 'get',
    params: { col }
  })
}

export function updateMaintenance(data) {
  return request({
    url: '/maintenance/update',
    method: 'post',
    data
  })
}
