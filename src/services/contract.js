import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryContractBasicInfo(params) {
  return request(`/elastic_sskj/api/search/heTong/other?${stringify(params)}`);
}

// 合同额区域分布
export async function queryContractAmountDataByRegion(params) {
  return request(`/elastic_sskj/api/search/heTong/hteqyfbcx?${stringify(params)}`)
}

// 决算额区域分布
export async function queryFinalAccountsDataByRegion(params) {
  return request(`/elastic_sskj/api/search/heTong/jseqyfbcx?${stringify(params)}`)
}

// 预算与决算差异统计
export async function queryYsjscytj(params) {
  return request(`/elastic_sskj/api/search/heTong/ysyjscytj?${stringify(params)}`)
}
