import request from '@/utils/request'

export function getGroups(d) {
  return request({
    url: '/groups',
    method: 'get',
    params: d
  })
}

export function getChartInfo(param) {
  return request({
    url: '/chart',
    method: 'get',
    params: param
  })
}
