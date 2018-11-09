import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryBasicInfo(params) {
  return request(`/elastic_sskj/api/search/jcxx/person?${stringify(params)}`);
}

// 个人诚信
export async function queryCredit(params) {
  return request(`/elastic_sskj/api/search/jcxx/pcredit?${stringify(params)}`);
}

// 人员参与项目经历
export async function queryEngList(params) {
  return request(`/elastic_sskj/api/search/jcxx/xmjl?${stringify(params)}`);
}

// 人员工作经历
export async function queryWorkList(params) {
  return request(`/elastic_sskj/api/search/jcxx/works?${stringify(params)}`);
}

// 岗位分析
export async function queryJobList(params) {
  return request(`/elastic_sskj/api/search/jcxx/job?${stringify(params)}`);
}

// 人员足迹
export async function queryRyzjList(params) {
  return request(`/elastic_sskj/api/search/jcxx/ryzj?${stringify(params)}`);
}
