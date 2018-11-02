import {
  queryBlxwJgbmzb,
  queryBlxwJgbmlxzb,
  queryBlxwQyxwpm,
  queryBlxwGrxwpm,
  queryBlxwXmpm,
  queryBlxwXwlxpm,
} from '@/services/analysis';

export default {
  namespace: 'badBehavior',

  state: {
    blxwJgbmzb: [],
    blxwJgbmlxzb: [],
    blxwQyxwpm: [],
    blxwGrxwpm: [],
  },

  effects: {
    // 不良行为分析 机构部门占比
    *fetchBlxwJgbmzb({payload}, { call, put }) {
      let blxwJgbmzb = [];
      try {
        const response = yield call(queryBlxwJgbmzb, payload);
        if (response && !response.msg) {
          blxwJgbmzb = response.map( r => ({
            x: r.organName,
            y: r.organNum,
          }));
        }
      } catch (e) {
        console.log('获取(机构部门占比)数据失败');
      }
      yield put({
        type: 'save',
        payload: {
          blxwJgbmzb,
        },
      });
    },
    // 不良行为分析 机构部门类型占比
    *fetchBlxwJgbmlxzb({payload}, { call, put }) {
      let blxwJgbmlxzb = [];
      try {
        const response = yield call(queryBlxwJgbmlxzb, payload);
        if (response && !response.msg) {
          blxwJgbmlxzb = response;
        }
      } catch (e) {
        console.log('获取(机构部门类型占比)数据失败');
      }
      yield put({
        type: 'save',
        payload: {
          blxwJgbmlxzb,
        },
      });
    },
    // 企业行为排名
    *fetchBlxwQyxwpm({payload}, { call, put }) {
      let blxwQyxwpm = [];
      try {
        const response = yield call(queryBlxwQyxwpm, payload);
        if (response && !response.msg) {
          const total = response.reduce((pre, now) => now.numBad + pre, 0);
          const sortFunction = (a, b) => {
            if (a.numBad === b.numBad) {
              if (a.numXYF > b.numXYF) {
                return -1;
              }
              return 1;
            }
            if (a.numBad > b.numBad) {
              return -1;
            }
            return 1;
          };
          blxwQyxwpm = response.sort(sortFunction).map( (r, index) => ({
            key: index + 1,
            ranking: index + 1,
            orgName: r.QYname,
            creditLevel: r.xydj,
            creditScore: r.numXYF,
            amountOfBehavior: r.numBad,
            rate: total === 0 ? 0 : r.numBad / total,
          }));
        }
      } catch (e) {
        console.log('获取(企业行为排名)数据失败');
      }
      yield put({
        type: 'save',
        payload: {
          blxwQyxwpm,
        },
      });
    },
    // 个人行为排名
    *fetchBlxwGrxwpm({payload}, { call, put }) {
      let blxwGrxwpm = [];
      try {
        const response = yield call(queryBlxwGrxwpm, payload);
        if (response && !response.msg) {
          const total = response.map( r => r.numBad).reduce((pre, now) => now + pre, 0);
          const sortFunction = (a, b) => {
            if (a.numBad === b.numBad) {
              if (a.numXYF > b.numXYF) {
                return -1;
              }
              return 1;
            }
            if (a.numBad > b.numBad) {
              return -1;
            }
            return 1;
          };
          blxwGrxwpm = response.sort(sortFunction).map((r, index) => ({
            key: index + 1,
            ranking: index + 1,
            name: r.username,
            orgName: r.QYname,
            creditLevel: r.xydj,
            creditScore: r.numXYF,
            amountOfBehavior: r.numBad,
            rate: `${((total === 0 ? 0 : (r.numBad - 0) / total) * 100).toFixed(2)}%`,
          }));
        }
      } catch (e) {
        console.log('获取(个人行为排名)数据失败');
      }
      yield put({
        type: 'save',
        payload: {
          blxwGrxwpm,
        },
      });
    },
    // 项目排名
    *fetchBlxwXmpm({payload}, { call, put }) {
      let blxwXmpm = [];
      try {
        const response = yield call(queryBlxwXmpm, payload);
        console.log(response);
        if (response && !response.msg) {
          blxwXmpm = response;
        }
      } catch (e) {
        console.log('获取(项目排名)数据失败');
      }
      yield put({
        type: 'save',
        payload: {
          blxwXmpm,
        },
      });
    }
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
        blxwJgbmzb: [],
        blxwJgbmlxzb: [],
        blxwQyxwpm: [],
        blxwGrxwpm: [],
      };
    },
  },
};
