import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryData(params) {
  return request(`/api/analysis?${stringify(params)}`);
}

export async function queryData1(params) {
  return request(`/api/analysis?${stringify(params)}`);
}