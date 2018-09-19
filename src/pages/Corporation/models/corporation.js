import { queryBasicInfo, queryCertificate } from '../../../services/corporation';

export default {
  namespace: 'corporation',

  state: {
    basicInfo: [],
    certificate: [],
  },

  effects: {
    *fetchBasicInfo(_, { call, put }) {
      const response = yield call(queryBasicInfo);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCertificate(_, { call, put }) {
      const response = yield call(queryCertificate);
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
  },
};
