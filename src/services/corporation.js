import {stringify} from 'qs';
import request from '@/utils/request';

export async function queryBasicInfo(params) {
  return request(`/elastic_sskj/api/search/jcxx/${params.id}`);
}

// 获取活跃经历（中标工程）
export async function queryHyjl(params) {
  return request(`/elastic_sskj/api/search/jcxx/hyjl/${params.id}`);
}

// 获取在建工程（施工许可工程）
export async function queryZjgc(params) {
  return request(`/elastic_sskj/api/search/jcxx/zjgc/${params.id}`);
}
