import http from '../utils/http';

export function apiGet(params) {
  return http({
    url: '/api/get',
    method: 'get',
    params
  });
}

export function apiPost(params) {
  return http({
    url: '/api/post',
    method: 'post',
    data: params
  });
}

export function apiErr(params) {
  return http({
    url: '/api/post/err',
    method: 'post',
    data: params
  });
}