import {
  queryBasicInfo,
  queryCredit,
  queryEngList,
  queryWorkList,
  queryJobList,
  queryRyzjList,
} from '@/services/person';

export default {
  namespace: 'person',

  state: {
    basicInfo: {},
    credit: {},
    engList: [],
    workList: [],
    jobList: [],
    ryzjList: [],
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
        yield put({
          type: 'save',
          payload: {
            basicInfo: []
          }
        });
      }
    },
    *fetchCredit({payload}, { call, put }) {
      try {
        const response = yield call(queryCredit, payload);
        yield put({
          type: 'save',
          payload: {
            credit: response.msg ? {} : response
          },
        });
      } catch (e) {
        yield put({
          type: 'save',
          payload: {
            credit: {}
          },
        });
      }
    },
    // 项目经历
    *fetchEngList({payload}, { call, put }) {
      try {
        const response = yield call(queryEngList, payload);
        yield put({
          type: 'save',
          payload: {
            engList: response.msg ? [] : response
          },
        });
      } catch (e) {
        yield put({
          type: 'save',
          payload: {
            engList: []
          },
        });
      }
    },
    // 工作经历
    *fetchWorkList({payload}, { call, put }) {
      try {
        const response = yield call(queryWorkList, payload);
        yield put({
          type: 'save',
          payload: {
            workList: response.msg ? [] : response
          },
        });
      } catch (e) {
        yield put({
          type: 'save',
          payload: {
            workList: []
          },
        });
      }
    },
    // 岗位经历
    *fetchJobList({payload}, { call, put }) {
      try {
        const response = yield call(queryJobList, payload);
        yield put({
          type: 'save',
          payload: {
            jobList: response.msg ? [] : response
          },
        });
      } catch (e) {
        yield put({
          type: 'save',
          payload: {
            jobList: []
          },
        });
      }
    },
    // 足迹分布
    *fetchRyzjList({payload}, { call, put }) {
      try {
        const response = yield call(queryRyzjList, payload);
        console.log(response);
        yield put({
          type: 'save',
          payload: {
            ryzjList: response.msg ? [] : response
          },
        });
      } catch (e) {
        yield put({
          type: 'save',
          payload: {
            ryzjList: []
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
