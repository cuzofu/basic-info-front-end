import { queryEngList, queryCorpList } from '@/services/analysis';

export default {
  namespace: 'construction',

  state: {
    engList: [],
    corpList: [],
  },

  effects: {
    *fetchEngList({payload}, { call, put }) {
      let engList = [];
      try {
        const response = yield call(queryEngList, payload);
        if (response && !response.msg) {
          engList = response;
        }
      } catch (e) {
        console.log('获取（工程列表）数据失败');
      }
      yield put({
        type: 'save',
        payload: {
          engList,
        },
      });
    },
    *fetchCorpList({payload}, { call, put }) {
      let corpList = [];
      try {
        const response = yield call(queryCorpList, payload);
        if (response && !response.msg) {
          corpList = response;
        }
      } catch (e) {
        console.log('获取（企业列表）数据失败');
      }
      yield put({
        type: 'save',
        payload: {
          corpList,
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
        engList: [],
        corpList: [],
      };
    },
  },
};
