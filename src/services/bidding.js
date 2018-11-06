import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryBiddingBasicInfo(params) {
  return request(`/elastic_sskj/api/search/eng/zbtop/${params.time}`);
}

export async function queryBiddingEngType(params) {
  return request(`/elastic_sskj/api/search/eng/gcType/${params.time}`);
}

export async function queryBiddingRegionType(params) {
  return request(`/elastic_sskj/api/search/eng/qyfb/${params.time}`);
}

// 规模分布
export async function queryGmfb(params) {
  return request(`/elastic_sskj/api/search/eng/gmfb/${params.time}`);
}

// 投资额分布
export async function queryTzefb(params) {
  return request(`/elastic_sskj/api/search/eng/tzefb/${params.time}`);
}

// 招标方式统计列表
export async function queryZbfstj(params) {
  return request(`/elastic_sskj/api/search/eng/searchgBYfs?${stringify(params)}`);
}
