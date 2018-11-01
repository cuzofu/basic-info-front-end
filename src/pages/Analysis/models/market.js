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
    ryhydpm: {
      list: [],
      pagination: {
        pageSize: 50,
      }
    },
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
      try {
        const response = yield call(queryQyhydpm, payload);
        console.log(response);
        yield put({
          type: 'save',
          payload: {
            qyhydpm: response || {
              list: [],
              pagination: {
                pageSize: 10,
              }
            },
          },
        });
      } catch (e) {
        yield put({
          type: 'save',
          payload: {
            qyhydpm: {
              list: [],
              pagination: {
                pageSize: 10,
              }
            },
          },
        });
      }
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
      try {
        const response = yield call(queryRyhydpm, payload);
        yield put({
          type: 'save',
          payload: {
            ryhydpm: response || {
              list: [],
              pagination: {
                pageSize: 10,
              }
            },
          },
        });
      } catch (e) {
        yield put({
          type: 'save',
          payload: {
            ryhydpm: {
              list: [],
              pagination: {
                pageSize: 10,
              }
            },
          },
        });
      }
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
        console.log(response);
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
