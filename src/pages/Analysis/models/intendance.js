import { queryZfwsks, queryData1 } from '@/services/analysis';

export default {
  namespace: 'intendance',

  state: {
    zfwsks: [],
    issueData: []
  },

  effects: {
    // 执法文书明细按科室分
    *fetchZfwsks({payload}, { call, put }) {
      let zfwsks = [];
      try {
        const response = yield call(queryZfwsks, payload);
        if (response && !response.msg) {
          const sortFunc = (a, b) => a.y > b.y ? 1 : -1;
          const ks = [];
          response.sort(sortFunc).forEach( r => {
            if (ks.indexOf(r.y) === -1) {
              ks.push(r.y);
            }
          });

          zfwsks = ks.map( k => {
            const d = {
              ksName: k,
            };
            response.forEach( r => {
              if (r.y === k) {
                d[r.x] = r.value;
              }
            });
            return d;
          });
        }
      } catch (e) {
        console.log('获取（执法文书明细按科室分）数据失败')
      }
      yield put({
        type: 'save',
        payload: {
          zfwsks,
        },
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
        zfwsks: [],
      };
    },
  },
};
