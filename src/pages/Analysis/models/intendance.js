import { queryData, queryData1 } from '@/services/analysis';

export default {
  namespace: 'intendance',

  state: {
    issueData: []
  },

  effects: {
    *fetchData({payload}, { call, put }) {
      const response = yield call(queryData, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchData1({payload}, { call, put }) {
      const response = yield call(queryData1, payload);
      yield put({
        type: 'save',
        payload: {
          salesData: response.salesData,
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
      };
    },
  },
};
