import { queryBasicInfo, queryCertificate } from '../../../services/corporation';

export default {
  namespace: 'corporation',

  state: {
    basicInfo: {},
    certificate: [],
  },

  effects: {
    *fetchBasicInfo({payload}, { call, put }) {
      try {
        const response = yield call(queryBasicInfo, payload);
        yield put({
          type: 'save',
          payload: {
            basicInfo: response
          },
        });
      } catch (e) {
        console.log(e);
        yield put({
          type: 'save',
          payload: {
            basicInfo: {}
          },
        });
      }
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
