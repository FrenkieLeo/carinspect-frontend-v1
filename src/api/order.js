import request from '@/utils/request'

// 获取驾驶员数据，col以对象的形式存在
export function getOrder(col) {
  return request({
    url: '/order',
    method: 'get',
    params: { col }
  })
}

export function updateOrder(data) {
  return request({
    url: '/order/update',
    method: 'post',
    data
  })
}
