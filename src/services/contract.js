import {stringify} from 'qs';
import request from '@/utils/request';

export async function queryContractBasicInfo(params) {
  return request(`/api/contract/basic/${stringify(params)}`);
}

// 合同额区域分布
export async function queryContractAmountDataByRegion(params) {
  return request(`/api/contract/amount/${stringify(params)}`);
}

// 决算额区域分布
export async function queryFinalAccountsDataByRegion(params) {
  return request(`/api/contract/final/accounts/${stringify(params)}`);
}
