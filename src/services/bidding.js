import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryBiddingBasicInfo(params) {
  return request(`/elastic_sskj/api/search/ztb/zbtop?${stringify(params)}`);
}

// 工程类型
export async function queryBiddingEngType(params) {
  return request(`/elastic_sskj/api/search/ztb/gclx?${stringify(params)}`);
}

// 区域分布
export async function queryBiddingRegionType(params) {
  return request(`/elastic_sskj/api/search/ztb/qyfb?${stringify(params)}`);
}

// 规模分布
export async function queryGmfb(params) {
  return request(`/elastic_sskj/api/search/eng/gmfb?${stringify(params)}`);
}

// 投资额分布
export async function queryTzefb(params) {
  return request(`/elastic_sskj/api/search/eng/tzefb?${stringify(params)}`);
}

// 招标方式统计列表
export async function queryZbfstj(params) {
  return request(`/elastic_sskj/api/search/ztb/zbfs?${stringify(params)}`);
}
