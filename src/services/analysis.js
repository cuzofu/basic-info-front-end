import { stringify } from 'qs';
import request from '@/utils/request';

export async function searchOrg(params) {
  return request(`/elastic_sskj/api/search/query/cio?${stringify(params)}`);
}

export async function searchPerson(params) {
  return request(`/elastic_sskj/api/search/query/person?${stringify(params)}`);
}

export async function searchEng(params) {
  return request(`/elastic_sskj/api/search/query/eng?${stringify(params)}`);
}

export async function jcxxEng(params) {
  return request(`/elastic_sskj/api/search/eng?${stringify(params)}`);
}

export async function queryEngList(params) {
  return request(`/elastic_sskj/api/search/engAnalysis`);
}

export async function queryCorpList(params) {
  return request(`/elastic_sskj/api/search/cioAnalysis`);
}

export async function queryQyAndRyCount(params) {
  return request(`/elastic_sskj/api/search/schy/ryandqy?${stringify(params)}`)
}

// 企业资质分析
export async function queryQyzzfx(params) {
  return request(`/elastic_sskj/api/search/schy/qyzzfx?${stringify(params)}`)
}

// 标段与企业明细
export async function queryBdqymx(params) {
  return request(`/elastic_sskj/api/search/schy/bdyqymx?${stringify(params)}`)
}

// 企业活跃度排名
export async function queryQyhydpm(params) {
  return request(`/elastic_sskj/api/search/schy/estahy`)
}

// 人员资质分析
export async function queryRyzzfx(params) {
  return request(`/elastic_sskj/api/search/schy/ryzzfx?${stringify(params)}`)
}

// 人员活跃度排名
export async function queryRyhydpm(params) {
  return request(`/elastic_sskj/api/search/schy/ryhydpm`)
}

// 建筑规模与活跃企业诚信等级分析
export async function queryJzgmHyqycxfxData(params) {
  return request(`/elastic_sskj/api/search/schy/gmandcxdj?${stringify(params)}`)
}

// 企业资质明细
export async function queryQyzzmx(params) {
  return request(`/elastic_sskj/api/search/schy/qyzzmx?${stringify(params)}`)
}

// 企业诚信等级占比
export async function queryQycxdjzbData(params) {
  return request(`/elastic_sskj/api/search/schy/qycxdjzb?${stringify(params)}`)
}

// 不良行为机构部门占比
export async function queryBlxwJgbmzb(params) {
  return request(`/elastic_sskj/api/search/organ/jgbmzb`)
}

// 不良行为机构部门类型占比
export async function queryBlxwJgbmlxzb(params) {
  return request(`/elastic_sskj/api/search/organ/jgbmlxzb`)
}

// 企业行为排名占比
export async function queryBlxwQyxwpm(params) {
  return request(`/elastic_sskj/api/search/organ/qyxwpmzb`)
}

// 个人行为排名占比
export async function queryBlxwGrxwpm(params) {
  return request(`/elastic_sskj/api/search/organ/grxwpmzb`)
}

// 项目排名占比
export async function queryBlxwXmpm(params) {
  return request(`/elastic_sskj/api/search/organ/blxwpmzb?${stringify(params)}`)
}

// 行为类型排名占比
export async function queryBlxwXwlxpm(params) {
  return request(`/elastic_sskj/api/search/organ/xwlxpmzb`)
}

// 执法文书明细按科室
export async function queryZfwsks(params) {
  return request(`/elastic_sskj/api/search/organ/zfwsmxaks`)
}

// 执法文书统计
export async function queryZfwstj(params) {
  return request(`/elastic_sskj/api/search/organ/zfwstj`)
}

// 项目排名占比
export async function queryZlwtpm(params) {
  return request(`/elastic_sskj/api/search/organ/xmpmzb?${stringify(params)}`)
}

// 工程排名（执法文书）
export async function queryZfwsGcpm(params) {
  return request(`/elastic_sskj/api/search/organ/gcpmazfws?${stringify(params)}`)
}

// 企业排名（执法文书）
export async function queryZfwsQypm(params) {
  return request(`/elastic_sskj/api/search/organ/qypmazfws?${stringify(params)}`)
}

// 工程排名（按问题）
export async function queryGczlwtpm(params) {
  return request(`/elastic_sskj/api/search/organ/gcpmawt`)
}

// 企业最新消息
export async function queryQyZxxx(params) {
  return request(`/elastic_sskj/api/search/cioByID?${stringify(params)}`)
}

// 参建情况
export async function queryQyCjqk(params) {
  return request(`/elastic_sskj/api/search/cioCJQK?${stringify(params)}`)
}

// 不良行为统计
export async function queryQyBlxwtj(params) {
  return request(`/elastic_sskj/api/search/cioBadByID?${stringify(params)}`)
}

// 诚信统计
export async function queryQyCxtj(params) {
  return request(`/elastic_sskj/api/search/cioCreditTJ?${stringify(params)}`)
}

// 不良行为扣分
export async function queryQyBlxwkf(params) {
  return request(`/elastic_sskj/api/search/cioBad?${stringify(params)}`)
}

// 问题列表
export async function queryQyWtlb(params) {
  return request(`/elastic_sskj/api/search/cioWTLB?${stringify(params)}`)
}

// 承建工程规模分析
export async function queryGcgmfx(params) {
  return request(`/elastic_sskj/api/search/cioGCGM?${stringify(params)}`)
}

// 承建工程规模分析列表
export async function queryGcgmfxlb(params) {
  return request(`/elastic_sskj/api/search/cioGCGMYou?${stringify(params)}`)
}

// 工程参建方
export async function engCjf(params) {
  return request(`/elastic_sskj/api/search/eng/cjf?${stringify(params)}`);
}

// 人员履职
export async function engRylz(params) {
  return request(`/elastic_sskj/api/search/eng/ryll?${stringify(params)}`);
}

// 最新消息
export async function engZxxx(params) {
  return request(`/elastic_sskj/api/search/eng/zxxx?${stringify(params)}`);
}

// 工程概况
export async function engGcgk(params) {
  return request(`/elastic_sskj/api/search/eng/gcgk?${stringify(params)}`);
}

// 问题统计
export async function engWttj(params) {
  return request(`/elastic_sskj/api/search/eng/wttj?${stringify(params)}`);
}

// 诚信统计
export async function engCxtj(params) {
  return request(`/elastic_sskj/api/search/eng/cxtj?${stringify(params)}`);
}

// 问题分析
export async function engWtfx(params) {
  return request(`/elastic_sskj/api/search/eng/wtfxLift?${stringify(params)}`);
}

// 问题列表
export async function engWtlb(params) {
  return request(`/elastic_sskj/api/search/eng/wtlb?${stringify(params)}`);
}

// 文书分析
export async function engWsfx(params) {
  return request(`/elastic_sskj/api/search/eng/wsfxLift?${stringify(params)}`);
}

// 文书列表
export async function engWslb(params) {
  return request(`/elastic_sskj/api/search/eng/wslb?${stringify(params)}`);
}

// 按诚信等级统计企业本地外地
export async function queryCioRegionCount(params) {
  return request(`/elastic_sskj/api/search/ciocredit/orgtype?${stringify(params)}`);
}

// 企业诚信数据统计列表
export async function queryCioCreditList(params) {
  return request('/elastic_sskj/api/credit/org/search', {
    method: 'POST',
    body: params,
  })
}
