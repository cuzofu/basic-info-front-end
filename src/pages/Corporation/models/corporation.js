import { queryBasicInfo, queryHyjl, queryZjgc } from '../../../services/corporation';

export default {
  namespace: 'corporation',

  state: {
    basicInfo: {},
    hyjl: [],
    zjgc: [],
  },

  effects: {
    *fetchBasicInfo({payload}, { call, put }) {
      try {
        const response = yield call(queryBasicInfo, payload);
        yield put({
          type: 'save',
          payload: {
            basicInfo: response.msg ? {} : response
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
    *fetchHyjl({payload}, { call, put }) {
      try {
        const response = yield call(queryHyjl, payload);
        yield put({
          type: 'save',
          payload: {
            hyjl: response.msg ? [] : response
          },
        });
      } catch (e) {
        console.log(e);
        yield put({
          type: 'save',
          payload: {
            hyjl: []
          },
        });
      }
    },
    *fetchZjgc({payload}, { call, put }) {
      try {
        const response = yield call(queryZjgc, payload);
        yield put({
          type: 'save',
          payload: {
            zjgc: response.msg ? [] : response
          },
        });
      } catch (e) {
        console.log(e);
        yield put({
          type: 'save',
          payload: {
            zjgc: []
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
  },
};
