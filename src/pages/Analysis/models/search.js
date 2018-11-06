import { search } from '@/services/analysis';

export default {
  namespace: 'search',

  state: {
    data: [],
  },

  effects: {
    *search({payload}, { call, put }) {
      const response = yield call(search, payload);
      yield put({
        type: 'save',
        payload: {
          data: response,
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
        data: []
      };
    },
  },
};
