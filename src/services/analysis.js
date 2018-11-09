import { stringify } from 'qs';
import request from '@/utils/request';

export async function searchOrg(params) {
  return request(`/elastic_sskj/api/search/query/cio`, {
    method: 'POST',
    body: {
      ...params
    }
  });
}

export async function searchPerson(params) {
  return request(`/elastic_sskj/api/search/query/person`, {
    method: 'POST',
    body: {
      ...params
    }
  });
}

export async function searchEng(params) {
  return request(`/elastic_sskj/api/search/query/eng`, {
    method: 'POST',
    body: {
      ...params
    }
  });
}

export async function queryData(params) {
  return request(`/api/analysis?${stringify(params)}`);
}

export async function queryData1(params) {
  return request(`/api/analysis?${stringify(params)}`);
}

export async function queryEngList(params) {
  return request(`/elastic_sskj/api/search/engAnalysis`);
}

export async function queryCorpList(params) {
  return request(`/elastic_sskj/api/search/cioAnalysis`);
}

export async function queryQyAndRyCount(params) {
  return request(`/elastic_sskj/api/search/eng/ryandqy?${stringify(params)}`)
}

// 企业资质分析
export async function queryQyzzfx(params) {
  return request(`/elastic_sskj/api/search/eng/qyzzfx?${stringify(params)}`)
}

// 标段与企业明细
export async function queryBdqymx(params) {
  return request(`/elastic_sskj/api/search/eng/bdandqy`, {
    method: 'POST',
    body: {
      ...params
    }
  })
}

// 企业活跃度排名
export async function queryQyhydpm(params) {
  return request(`/elastic_sskj/api/search/eng/Estahy`, {
    method: 'POST',
    body: {
      ...params
    }
  })
}

// 人员资质分析
export async function queryRyzzfx(params) {
  return request(`/elastic_sskj/api/search/eng/userzz?${stringify(params)}`)
}

// 人员活跃度排名
export async function queryRyhydpm(params) {
  return request(`/elastic_sskj/api/search/eng/userhy`, {
    method: 'POST',
    body: {
      ...params
    }
  })
}

// 建筑规模与活跃企业诚信等级分析
export async function queryJzgmHyqycxfxData(params) {
  return request(`/elastic_sskj/api/search/eng/gmandcxdj?${stringify(params)}`)
}

// 企业资质明细
export async function queryQyzzmx(params) {
  return request(`/elastic_sskj/api/search/eng/qyzzmx`, {
    method: 'POST',
    body: {
      ...params
    }
  })
}

// 企业诚信等级占比
export async function queryQycxdjzbData(params) {
  return request(`/elastic_sskj/api/search/eng/qycxdj?${stringify(params)}`)
}

// 不良行为机构部门占比
export async function queryBlxwJgbmzb(params) {
  return request(`/elastic_sskj/api/search/organBad`)
}

// 不良行为机构部门类型占比
export async function queryBlxwJgbmlxzb(params) {
  return request(`/elastic_sskj/api/search/organTypeBad`)
}

// 企业行为排名占比
export async function queryBlxwQyxwpm(params) {
  return request(`/elastic_sskj/api/search/organByRank`)
}

// 个人行为排名占比
export async function queryBlxwGrxwpm(params) {
  return request(`/elastic_sskj/api/search/userByRank`)
}

// 项目排名占比
export async function queryBlxwXmpm(params) {
  return request(`/elastic_sskj/api/search/proByRank`)
}

// 行为类型排名占比
export async function queryBlxwXwlxpm(params) {
  return request(`/elastic_sskj/api/search/behByRank`)
}

// 执法文书明细按科室
export async function queryZfwsks(params) {
  return request(`/elastic_sskj/api/search/organByLaw`)
}

// 执法文书统计
export async function queryZfwstj(params) {
  return request(`/elastic_sskj/api/search/organBySum`)
}

// 项目排名占比
export async function queryZlwtpm(params) {
  return request(`/elastic_sskj/api/search/organRank`, {
    method: 'POST',
    body: {
      ...params
    }
  })
}

// 工程排名（执法文书）
export async function queryZfwsGcpm(params) {
  return request(`/elastic_sskj/api/search/organByProblemAndLaw`, {
    method: 'POST',
    body: {
      ...params
    }
  })
}

// 企业排名（执法文书）
export async function queryZfwsQypm(params) {
  return request(`/elastic_sskj/api/search/organProblemByLaw`, {
    method: 'POST',
    body: {
      ...params
    }
  })
}

// 工程排名（按问题）
export async function queryGczlwtpm(params) {
  return request(`/elastic_sskj/api/search/organByProblem`)
}

// 企业最新消息
export async function queryQyZxxx(params) {
  return request(`/elastic_sskj/api/search/cioByID/${params.id}`)
}

// 参建情况
export async function queryQyCjqk(params) {
  return request(`/elastic_sskj/api/search/cioCJQK/${params.id}`)
}

// 不良行为统计
export async function queryQyBlxwtj(params) {
  return request(`/elastic_sskj/api/search/cioBadByID/${params.id}`)
}

// 诚信统计
export async function queryQyCxtj(params) {
  return request(`/elastic_sskj/api/search/cioCreditTJ/${params.id}`)
}

// 不良行为扣分
export async function queryQyBlxwkf(params) {
  return request(`/elastic_sskj/api/search/cioBad/${params.id}`)
}

// 问题列表
export async function queryQyWtlb(params) {
  return request(`/elastic_sskj/api/search/cioWTLB/${params.id}`)
}

