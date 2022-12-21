import request from '@/utils/request'

// 获取驾驶员数据，col以对象的形式存在
export function getEtc(col) {
  return request({
    url: '/etc',
    method: 'get',
    params: { col }
  })
}

export function updateEtc(data) {
  return request({
    url: '/etc/update',
    method: 'post',
    data
  })
}

export function insertETC(data) {
  return request({
    url: '/etc/insert',
    method: 'post',
    data
  })
}
