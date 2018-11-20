import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryMultiple(params) {
  return request(`/api/foos?${stringify(params)}`);
}

export async function querySingle({ id }) {
  return request(`/api/foos/${id}`);
}

export async function removeMultiple({ ids }) {
  return request(`/api/foos`, {
    method: 'DELETE',
    body: {
      id: ids,
    },
  });
}

export async function removeSingle({ id }) {
  return request(`/api/foos/${id}`, {
    method: 'DELETE',
  });
}

export async function addMultiple(params) {
  return request('/api/foos/multiple', {
    method: 'POST',
    body: params,
  });
}

export async function addSingle(params) {
  return request('/api/foos', {
    method: 'POST',
    body: params,
  });
}

export async function updateMultiple({ fields, ids }) {
  return request(`/api/foos`, {
    method: 'PATCH',
    body: {
      fields,
      filter: {
        id: ids,
      },
    },
  });
}

export async function updateSingle({ id, ...params }) {
  return request(`/api/foos/${id}`, {
    method: 'PATCH',
    body: params,
  });
}
