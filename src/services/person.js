import {stringify} from 'qs';
import request from '@/utils/request';

export async function queryBasicInfo(params) {
  return request(`/api/person/basic/${stringify(params)}`);
}

export async function queryCertificate(params) {
  return request(`/api/person/certificate/${stringify(params)}`);
}
