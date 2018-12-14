import request from '@/utils/request';

export async function userLogin(params) {
  return request('/api/account/login', {
    method: 'POST',
    body: params,
  });
}

export async function queryCurrentUser() {
  return request('/api/account/currentUser');
}
