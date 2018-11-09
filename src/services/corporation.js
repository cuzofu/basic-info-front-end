import {stringify} from 'qs';
import request from '@/utils/request';

export async function queryBasicInfo(params) {
  return request(`/elastic_sskj/api/search/jcxx?${stringify(params)}`);
}

// 获取活跃经历（中标工程）
export async function queryHyjl(params) {
  return request(`/elastic_sskj/api/search/jcxx/hyjl?${stringify(params)}`);
}

// 获取在建工程（施工许可工程）
export async function queryZjgc(params) {
  return request(`/elastic_sskj/api/search/jcxx/zjgc?${stringify(params)}`);
}

// 获取企业诚信数据
export async function queryCredit(params) {
  return request(`/elastic_sskj/api/search/jcxx/credit?${stringify(params)}`);
}
