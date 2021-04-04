import request from '@/utils/request';

export async function querySummary() {
  return request('/api/summary');
}

export async function queryCountry(params) {
  return request(`/api/country/${params.country}`);
}

export async function queryWorld() {
  return request('/api/world');
}
