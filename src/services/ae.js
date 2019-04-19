import {stringify} from 'qs';
import request from '@/utils/request';

// 行政审批总占比,行政许可事项比率
export async function queryXzspzzb(params) {
  return request(`/elastic_sskj/api/search/xzsp/xzspzzb?${stringify(params)}`);
}

// 行政许可事项明细,时间轴
export async function queryXzxksxmx(params) {
  return request(`/elastic_sskj/api/search/xzsp/xzxksxmx?${stringify(params)}`);
}

// 办理科室总占比
export async function queryBlkszzb(params) {
  return request(`/elastic_sskj/api/search/jzynx/blkszzb?${stringify(params)}`);
}

// 办理科室分析
export async function queryBlksfx(params) {
  return request(`/elastic_sskj/api/search/jzynx/blksfx?${stringify(params)}`);
}

// 办件明细,时间轴
export async function queryBjmx(params) {
  return request(`/elastic_sskj/api/search/jzynx/bjmx?${stringify(params)}`);
}

// 办件人员明细
export async function queryBjrymx(params) {
  return request(`/elastic_sskj/api/search/jzynx/bjrymx?${stringify(params)}`);
}




