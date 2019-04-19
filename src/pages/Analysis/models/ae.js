import {
  queryXzspzzb,
  queryXzxksxmx,
} from '@/services/ae';

export default {
  namespace: 'ae',

  state: {
    xzspzzb: [],
    xzxksxmx:[],
    timeLine: {},
  },

  effects: {
    // 行政审批总占比 ,行政许可事项比率
    *fetchXzspzzb({payload}, { call, put }) {
      let xzspzzb = [];
      try {
        const response = yield call(queryXzspzzb, payload);
        if (response && !response.msg) {
          const type = [];
          response.forEach( r => {
            if (!type.includes(r.x)) {
              type.push(r.x);
            }
          });
          let temp = type.map( t => ({
            spsx: t,
          }));
          response.forEach( r => {
            temp = temp.map( s => {
              if (s.spsx === r.x) {
                return {
                  ...s,
                  "按期数": r.y === '按时' ? r.value : (s['按期数'] === undefined ? 0 : s['按期数']),
                  "超期数": r.y === '超时' ? r.value : (s['超期数'] === undefined ? 0 : s['超期数']),
                }
              }
              return s;
            });
          });
         xzspzzb = temp;
        }
      } catch (e) {
        console.log(e);
      }
      yield put({
        type: 'save',
        payload: {
          xzspzzb,
        },
      });
    },

    // 行政许可事项明细,时间轴
    *fetchXzxksxmx({payload}, { call, put }) {
      let xzxksxmx = [];
      try {
        const response = yield call(queryXzxksxmx, payload);
        if (response && !response.msg) {
          xzxksxmx = response.map((r, index) => ({
            ...r,
            index: index + 1,
          }));
        }
      } catch (e) {
        console.log(e);
      }
      yield put({
        type: 'save',
        payload: {
          xzxksxmx,
        },
      });
      if (xzxksxmx.length > 0) {
        const data = xzxksxmx[0];
        yield put({
          type: 'saveTimeLine',
          payload: {
            clTime: data.clTime,
            isOnTime: data.isOnTime,
            sjTime: data.sjTime,
            sjz: data.sjz,
          }
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
    saveTimeLine(state, { payload }) {
      return {
        ...state,
        timeLine: {
          ...payload,
        },
      }
    },
    clear() {
      return {
        xzspzzb: [],
        xzxksxmx: [],
        timeLine: {},
      };
    },
  },
};
