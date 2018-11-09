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
      let basicInfo = {};
      try {
        const response = yield call(queryBasicInfo, payload);
        if (response && !response.msg) {
          basicInfo = response;
        }
      } catch (e) {
        console.log('获取个人信息失败')
      }
      yield put({
        type: 'save',
        payload: {
          basicInfo,
        }
      });
    },
    *fetchCredit({payload}, { call, put }) {
      let credit = {};
      try {
        const response = yield call(queryCredit, payload);
        if (response && !response.msg) {
          credit = response;
        }
      } catch (e) {
        console.log('获取个人诚信信息失败')
      }
      yield put({
        type: 'save',
        payload: {
          credit,
        },
      });
    },
    // 项目经历
    *fetchEngList({payload}, { call, put }) {
      let engList = [];
      try {
        const response = yield call(queryEngList, payload);
        if (response && !response.msg) {
          engList = response;
        }
      } catch (e) {
        console.log('获取项目经历失败')
      }
      yield put({
        type: 'save',
        payload: {
          engList,
        },
      });
    },
    // 工作经历
    *fetchWorkList({payload}, { call, put }) {
      let workList = [];
      try {
        const response = yield call(queryWorkList, payload);
        if (response && !response.msg) {
          workList = response;
        }
      } catch (e) {
        console.log('获取工作经历失败')
      }
      yield put({
        type: 'save',
        payload: {
          workList,
        },
      });
    },
    // 岗位经历
    *fetchJobList({payload}, { call, put }) {
      let jobList = [];
      try {
        const response = yield call(queryJobList, payload);
        if (response && !response.msg) {
          jobList = response;
        }
      } catch (e) {
        console.log('获取岗位经历失败')
      }
      yield put({
        type: 'save',
        payload: {
          jobList,
        },
      });
    },
    // 足迹分布
    *fetchRyzjList({payload}, { call, put }) {
      let ryzjList = [];
      try {
        const response = yield call(queryRyzjList, payload);
        if (response && !response.msg) {
          ryzjList = response;
        }
      } catch (e) {
        console.log('获取足迹分布失败')
      }
      yield put({
        type: 'save',
        payload: {
          ryzjList,
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
        basicInfo: {},
        credit: {},
        engList: [],
        workList: [],
        jobList: [],
        ryzjList: [],
      };
    },
  },
};
