import { queryData, } from '@/services/analysis';

export default {
  namespace: 'engAnalysis',

  state: {
    basicInfo: {}
  },

  effects: {
    *fetchBasicInfo({payload}, { call, put }) {
      const response = yield call(queryData, payload);
      yield put({
        type: 'save',
        payload: {
          basicInfo: {}
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
        basicInfo: {}
      };
    },
  },
};
