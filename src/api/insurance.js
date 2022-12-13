import request from '@/utils/request'

// 获取驾驶员数据，col以对象的形式存在
export function getInsurance(col) {
  return request({
    url: '/insurance',
    method: 'get',
    params: { col }
  })
}

export function updateInsurance(data) {
  return request({
    url: '/insurance/update',
    method: 'post',
    data
  })
}
