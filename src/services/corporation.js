import {stringify} from 'qs';
import request from '@/utils/request';

export async function queryBasicInfo(params) {
  return request(`/elastic_sskj/api/search/jcxx/${params.id}`);
}

export async function queryCertificate(params) {
  return request(`/api/corporation/certificate/${stringify(params)}`);
}
