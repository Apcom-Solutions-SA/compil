import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/notes/list',
    method: 'get',
    params: query
  })
}

export function fetchNote(id) {
  return request({
    url: '/notes/' + id,
    method: 'get'
  })
}

export function fetchPv(pv) {
  return request({
    url: '/notes/pv',
    method: 'get',
    params: { pv }
  })
}

export function createNote(data) {
  return request({
    url: '/notes',
    method: 'post',
    data
  })
}

export function updateNote(data) {
  return request({
    url: '/notes/update',
    method: 'dispatch',
    data
  })
}