import {
  queryQyAndRyCount,
  queryQyzzfx,
  queryBdqymx,
  queryQyhydpm,
  queryRyzzfx,
  queryRyhydpm,
  queryJzgmHyqycxfxData,
  queryQycxdjzbData,
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
  },

  effects: {
    // 企业及人员数量统计
    *fetchQyAndRyCount({payload}, { call, put}) {
      try {
        const response = yield call(queryQyAndRyCount, payload);
        yield put({
          type: 'save',
          payload: {
            qyAndRyCount: response || {}
          }
        });
      } catch (e) {
        yield put({
          type: 'save',
          payload: {
            qyAndRyCount: {}
          }
        });
      }
    },
    // 企业资质分析
    *fetchQyzzfxData({payload}, { call, put }) {
      try {
        const response = yield call(queryQyzzfx, payload);
        yield put({
          type: 'save',
          payload: {
            qyzzfx: response
          },
        });
      } catch (e) {
        yield put({
          type: 'save',
          payload: {
            qyzzfx: []
          },
        });
      }
    },
    // 标段与企业明细
    *fetchBdqymxData({payload}, { call, put }) {
      try {
        const response = yield call(queryBdqymx, payload);
        yield put({
          type: 'save',
          payload: {
            bdqymx: response || {
              list: [],
              pagination: {
                pageSize: 5,
              }
            },
          },
        });
      } catch (e) {
        yield put({
          type: 'save',
          payload: {
            bdqymx: {
              list: [],
              pagination: {
                pageSize: 10,
              }
            },
          },
        });
      }
    },
    // 企业活跃度排名
    *fetchQyhydpmData({payload}, { call, put }) {
      let qyhydpm = [];
      try {
        const response = yield call(queryQyhydpm, payload);
        const total = response.reduce((pre, now) => (now.bidNum + pre), 0);
        if (response && !response.msg) {
          const sortFunc = (a, b) => {
            if (a.bidNum === b.bidNum) {
              if (a.sumTZE > b.sumTZE) {
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
      try {
        const response = yield call(queryRyzzfx, payload);
        yield put({
          type: 'save',
          payload: {
            ryzzfx: response || [],
          },
        });
      } catch (e) {
        yield put({
          type: 'save',
          payload: {
            ryzzfx: [],
          },
        });
      }
    },
    // 人员活跃度排名
    *fetchRyhydpmData({payload}, { call, put }) {
      let ryhydpm = [];
      try {
        const response = yield call(queryRyhydpm, payload);
        if (response && !response.msg) {

          const sortFunc = (a, b) => {
            if (a.jobNum === b.jobNum) {
              if (a.tze > b.tze) {
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
      try {
        const response = yield call(queryJzgmHyqycxfxData, payload);
        const jzgmHyqycxfx = response && response.map( r => {
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
        yield put({
          type: 'save',
          payload: {
            jzgmHyqycxfx,
          },
        });
      } catch (e) {
        yield put({
          type: 'save',
          payload: {
            jzgmHyqycxfx: [],
          },
        });
      }
    },
    // 企业诚信等级占比
    *fetchQycxdjzbData({payload}, { call, put }) {
      try {
        const response = yield call(queryQycxdjzbData, payload);
        yield put({
          type: 'save',
          payload: {
            qycxdjzb: response || [],
          },
        });
      } catch (e) {
        yield put({
          type: 'save',
          payload: {
            qycxdjzb: [],
          },
        });
      }
    },
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
        ryhydpm: {
          list: [],
          pagination: {
            pageSize: 50,
          }
        },
        jzgmHyqycxfx: [],
        ryzzfx: [],
      };
    },
  },
};
