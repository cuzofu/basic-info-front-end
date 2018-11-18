import {
  queryQyAndRyCount,
  queryQyzzfx,
  queryBdqymx,
  queryQyhydpm,
  queryRyzzfx,
  queryRyhydpm,
  queryJzgmHyqycxfxData,
  queryQycxdjzbData,
  queryQyzzmx,
} from '@/services/analysis';

const sum = (data, key1, key2) => data.filter( r => r.groupY === key1 && r.groupX.indexOf(key2) >= 0).reduce((pre, now) => parseInt(now.value, 0) + pre, 0);

export default {
  namespace: 'market',

  state: {
    qyAndRyCount: {},
    qyzzfx: [],
    bdqymx: {
      list: [],
      pagination: {
        pageSize: 10,
      }
    },
    ryhydpm: [],
    qyhydpm: [],
    jzgmHyqycxfx: [],
    ryzzfx: [],
    qycxdjzb: [],
    qyzzmx: [],
  },

  effects: {
    // 企业及人员数量统计
    *fetchQyAndRyCount({payload}, { call, put}) {
      let qyAndRyCount = [];
      try {
        const response = yield call(queryQyAndRyCount, payload);
        if (response && !response.msg) {
          const {
            addQYRK = 0,
            sumQYRK = 0,
            addRKRY = 0,
            sumRKRY = 0,
            countTBS = 0,
            countZBS = 0,
            userTBS = 0,
            userZBS = 0,
          } = response;

          qyAndRyCount = {
            sumQYRK,
            addQYRK,
            ratioQYRK: (sumQYRK - addQYRK) === 0 ? 0 : (addQYRK / (sumQYRK - addQYRK) * 100).toFixed(2),
            sumRKRY,
            addRKRY,
            ratioRKRY: (sumRKRY - addRKRY) === 0 ? 0 : (addRKRY / (sumRKRY - addRKRY) * 100).toFixed(2),
            countTBS,
            ratioQYTB: sumQYRK === 0 ? 0 : (countTBS / sumQYRK * 100).toFixed(2),
            countZBS,
            ratioQYZB: sumQYRK === 0 ? 0 : (countZBS / sumQYRK * 100).toFixed(2),
            userTBS,
            ratioRYTB: sumRKRY === 0 ? 0 : (userTBS / sumRKRY * 100).toFixed(2),
            userZBS,
            ratioRYZB: sumRKRY === 0 ? 0 : (userZBS / sumRKRY * 100).toFixed(2),
          };
        }
      } catch (e) {
        console.log('获取（企业及人员数量统计）数据失败')
      }
      yield put({
        type: 'save',
        payload: {
          qyAndRyCount,
        }
      });
    },
    // 企业资质分析
    *fetchQyzzfxData({payload}, { call, put }) {
      let qyzzfx = [];
      try {
        const response = yield call(queryQyzzfx, payload);
        if (response && !response.msg) {
          qyzzfx = response;
        }
      } catch (e) {
        console.log('获取（企业资质分析）数据失败')
      }
      yield put({
        type: 'save',
        payload: {
          qyzzfx,
        },
      });
    },
    // 标段与企业明细
    *fetchBdqymxData({payload}, { call, put }) {
      let bdqymx = {
        list: [],
        pagination: {
          pageSize: 10,
        }
      };
      try {
        const response = yield call(queryBdqymx, payload);
        if (response && !response.msg) {
          bdqymx = response;
        }
      } catch (e) {
        console.log('获取（标段与企业明细）数据失败')
      }
      yield put({
        type: 'save',
        payload: {
          bdqymx,
        },
      });
    },
    // 企业活跃度排名
    *fetchQyhydpmData({payload}, { call, put }) {
      let qyhydpm = [];
      try {
        const response = yield call(queryQyhydpm, payload);
        if (response && !response.msg) {
          const total = response.reduce((pre, now) => (now.bidNum + pre), 0);
          const sortFunc = (a, b) => {
            if (a.bidNum === b.bidNum) {
              if ((a.sumTZE - 0) > (b.sumTZE - 0)) {
                return -1;
              }
              return 1;
            }
            if (a.bidNum > b.bidNum) {
              return -1;
            }
            return 1;
          };
          qyhydpm = response.sort(sortFunc).map( r => ({
            ...r,
            sumTZE: (r.sumTZE - 0).toFixed(6),
            zhanbi: total === 0 ? 0 : r.bidNum / total,
          }));
        }
      } catch (e) {
        console.log('企业活跃度排名（ERROR）');
      }
      yield put({
        type: 'save',
        payload: {
          qyhydpm,
        },
      });
    },
    // 人员资质分析
    *fetchRyzzfxData({payload}, { call, put }) {
      let ryzzfx = [];
      try {
        const response = yield call(queryRyzzfx, payload);
        if (response && !response.msg) {
          ryzzfx = response;
        }
      } catch (e) {
        console.log('获取数据失败');
      }
      yield put({
        type: 'save',
        payload: {
          ryzzfx,
        },
      });
    },
    // 人员活跃度排名
    *fetchRyhydpmData({payload}, { call, put }) {
      let ryhydpm = [];
      try {
        const response = yield call(queryRyhydpm, payload);
        if (response && !response.msg) {
          const sortFunc = (a, b) => {
            if (a.jobNum === b.jobNum) {
              if ((a.tze - 0) > (b.tze - 0)) {
                return -1;
              }
              return 1;
            }
            if (a.jobNum > b.jobNum) {
              return -1;
            }
            return 1;
          };

          ryhydpm = response.sort(sortFunc);
        }
      } catch (e) {
        console.log('人员活跃度排名');
      }
      yield put({
        type: 'save',
        payload: {
          ryhydpm,
        },
      });
    },
    // 建筑规模与活跃企业诚信等级分析
    *fetchJzgmHyqycxfxData({payload}, { call, put }) {
      let jzgmHyqycxfx = [];
      try {
        const response = yield call(queryJzgmHyqycxfxData, payload);
        jzgmHyqycxfx = response && response.map( r => {
          const rtn = {
            groupX: r.groupX,
            groupY: r.groupY,
          };
          if (r.groupX.indexOf('企业诚信') >= 0) {
            rtn.value = parseInt(r.value, 0) / sum(response, r.groupY, '企业诚信');
          } else {
            rtn.value = parseInt(r.value, 0) / sum(response, r.groupY, '企业资质诚信');
          }
          return rtn;
        });
      } catch (e) {
        console.log('获取（建筑规模与活跃企业诚信等级分析）数据失败')
      }
      yield put({
        type: 'save',
        payload: {
          jzgmHyqycxfx,
        },
      });
    },
    // 企业诚信等级占比
    *fetchQycxdjzbData({payload}, { call, put }) {
      let qycxdjzb = [];
      try {
        const response = yield call(queryQycxdjzbData, payload);
        if (response && !response.msg) {
          qycxdjzb = response;
        }
      } catch (e) {
        console.log('获取（企业诚信等级占比）数据失败')
      }
      yield put({
        type: 'save',
        payload: {
          qycxdjzb,
        },
      });
    },
    // 企业资质明细
    *fetchQyzzmxData({payload}, { call, put }) {
      let qyzzmx = [];
      try {
        const response = yield call(queryQyzzmx, payload);
        if (response && !response.msg) {
          const total = response.reduce((pre, now) => now.numZZ + pre, 0);
          qyzzmx = response.map(r => ({
            ...r,
            ratio: (total === 0 ? 0 : r.numZZ / total * 100).toFixed(2)
          }));
        }
      } catch (e) {
        console.log('获取（企业资质明细）数据失败');
      }
      yield put({
        type: 'save',
        payload: {
          qyzzmx,
        },
      });
    }
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return {
        qyAndRyCount: {},
        qyzzfx: [],
        bdqymx: {
          list: [],
          pagination: {
            pageSize: 10,
          }
        },
        ryhydpm: [],
        jzgmHyqycxfx: [],
        ryzzfx: [],
        qyzzmx: [],
      };
    },
  },
};
