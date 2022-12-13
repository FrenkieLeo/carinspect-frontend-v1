import request from '@/utils/request'

// 获取展示面板的数据
export function getDashboard(col) {
  return request({
    url: '/dashboard',
    method: 'get',
    params: { col }
  })
}
