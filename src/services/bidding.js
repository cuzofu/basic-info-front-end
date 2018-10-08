import {stringify} from 'qs';
import request from '@/utils/request';

export async function queryBiddingBasicInfo(params) {
  return request(`/api/bidding/basic/${stringify(params)}`);
}

export async function queryBiddingEngType(params) {
  return request(`/api/bidding/engs/${stringify(params)}`);
}
