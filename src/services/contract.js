import request from '@/utils/request';

export async function queryContractBasicInfo(params) {
  return request(`/elastic_sskj/api/search/eng/other/${params.time}`);
}

// 合同额区域分布
export async function queryContractAmountDataByRegion(params) {
  return request(`/elastic_sskj/api/search/eng/htjkfb/${params.time}`)
}

// 决算额区域分布
export async function queryFinalAccountsDataByRegion(params) {
  return request(`/elastic_sskj/api/search/eng/jsefb/${params.time}`)
}

// 预算与决算差异统计
export async function queryYsjscytj(params) {
  return request(`/elastic_sskj/api/search/eng/ysAndjs/${params.time}`)
}
