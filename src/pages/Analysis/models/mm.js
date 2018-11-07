import { queryData } from '@/services/analysis';

export default {
  namespace: 'mm',

  state: {
  },

  effects: {
    *fetchData({payload}, { call, put }) {
      const response = yield call(queryData, payload);
      yield put({
        type: 'save',
        payload: response,
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
      };
    },
  },
};
