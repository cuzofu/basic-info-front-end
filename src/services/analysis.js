import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryData(params) {
  return request(`/api/analysis?${stringify(params)}`);
}

export async function queryData1(params) {
  return request(`/api/analysis?${stringify(params)}`);
}

export async function queryEngList(params) {
  return request(`/elastic_sskj/api/search/engAnalysis`, {
    method: 'POST',
    body: {
      ...params
    }
  });
}

export async function queryCorpList(params) {
  return request(`/api/analysis/construction?${stringify(params)}`);
}

export async function queryQyAndRyCount(params) {
  return request(`/elastic_sskj/api/search/eng/ryandqy/${params.time}`)
}

// 企业资质分析
export async function queryQyzzfx(params) {
  return request(`/elastic_sskj/api/search/eng/qyzzfx/${params.time}`)
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
  return request(`/elastic_sskj/api/search/eng/userzz/${params.time}`)
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
  return request(`/elastic_sskj/api/search/eng/gmandcxdj/${params.time}`)
}

// 企业资质明细

// 企业诚信等级占比
export async function queryQycxdjzbData(params) {
  return request(`/elastic_sskj/api/search/eng/qycxdj/${params.time}`)
}

