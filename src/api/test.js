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

export function apiText(params) {
  return http({
    url: '/api/text',
    method: 'post',
    data: params
  });
}