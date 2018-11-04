import {
  queryBlxwJgbmzb,
  queryBlxwJgbmlxzb,
  queryBlxwQyxwpm,
  queryBlxwGrxwpm,
  queryBlxwXmpm,
  queryBlxwXwlxpm,
} from '@/services/analysis';

const sum = (data, key1) => data.filter( r => r.y === key1).reduce((pre, now) => parseInt(now.value, 0) + pre, 0);

export default {
  namespace: 'badBehavior',

  state: {
    blxwJgbmzb: [],
    blxwJgbmlxzb: [],
    blxwQyxwpm: [],
    blxwGrxwpm: [],
    blxwXwlxpm: [],
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
          blxwJgbmlxzb = response.map( r => {
            const rtn = {
              groupX: r.x,
              groupY: r.y,
            };
            const total = sum(response, r.y);
            rtn.value = total === 0 ? 0 : parseFloat(r.value) / total;
            return rtn;
          });
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
        if (response && !response.msg) {
          const total = response.reduce((pre, now) => now.count + pre, 0);
          const sortFunction = (a, b) => {
            if (a.count === b.count) {
              if (a.numQY === b.numQY) {
                if (a.numUser > b.numUser) {
                  return -1;
                }
                return 1;
              }
              if (a.numQY > b.numQY) {
                return -1;
              }
              return 1;
            }
            if (a.count > b.count) {
              return -1;
            }
            return 1;
          };

          blxwXmpm = response.sort(sortFunction).map((r, index) => ({
            key: index + 1,
            rank: index + 1,
            engName: r.nameXM,
            countEng: r.numQY,
            countPerson: r.numUser,
            count: r.count,
            rate: `${(total === 0 ? 0 : (r.count / total * 100)).toFixed(2)}%`,
          }));
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
    },
    // 行为类型排名
    *fetchBlxwXwlxpm({payload}, { call, put}) {
      let blxwXwlxpm = [];
      try {
        const response = yield call(queryBlxwXwlxpm, {payload});
        if (response && !response.msg) {
          const total = response.reduce((pre, now) => now.count + pre, 0);
          const sortFunction = (a, b) => a.count > b.count ? -1 : 1;
          blxwXwlxpm = response.sort(sortFunction).map((r, index) => ({
            key: index + 1,
            index: index + 1,
            behaviorNo: r.username,
            behaviorType: r.QYname,
            countOfEng: r.count,
            rate: `${(total === 0 ? 0 : r.count / total * 100).toFixed(2)}%`,
          }));
        }
      } catch (e) {
        console.log('获取（行为类型排名）数据失败');
      }
      yield put({
        type: 'save',
        payload: {
          blxwXwlxpm,
        }
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
