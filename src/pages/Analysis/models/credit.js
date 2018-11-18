import {
  queryCioRegionCount,
  queryCioCreditList,
} from '@/services/analysis';

export default {
  namespace: 'credit',

  state: {
    creditList: {
      list: [],
      pagination: {},
    },
    cioRegionCount: {}
  },

  effects: {
    *fetchCioCreditList({payload}, { call, put }) {
      const response = yield call(queryCioCreditList, payload);
      yield put({
        type: 'save',
        payload: {
          creditList: response,
        },
      });
    },
    *fetchCioRegionCount({payload}, { call, put }) {
      let cioRegionCount = {};
      try {
        const response = yield call(queryCioRegionCount, payload);
        if (response && !response.msg) {
          const {
            all,
            A级,
            B级,
            C级,
          } = response;
          cioRegionCount = {
            qyzs: all.本地 + all.外地,
            ajizs: A级.本地 + A级.外地,
            bjizs: B级.本地 + B级.外地,
            cjizs: C级.本地 + C级.外地,
            qybdbl: (all.本地 + all.外地) === 0 ? 0 : (all.本地 / (all.本地 + all.外地) * 100).toFixed(2),
            ajibdbl: (A级.本地 + A级.外地) === 0 ? 0 : (A级.本地 / (A级.本地 + A级.外地) * 100).toFixed(2),
            bjibdbl: (B级.本地 + B级.外地) === 0 ? 0 : (B级.本地 / (B级.本地 + B级.外地) * 100).toFixed(2),
            cjibdbl: (C级.本地 + C级.外地) === 0 ? 0 : (C级.本地 / (C级.本地 + C级.外地) * 100).toFixed(2),
          };
        }
      } catch (e) {
        console.log('获取人员列表失败');
      }
      yield put({
        type: 'save',
        payload: {
          cioRegionCount,
        },
      });
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
        cioRegionCount: {}
      };
    },
  },
};
