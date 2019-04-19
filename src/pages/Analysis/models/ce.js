import {
  queryBlkszzb,
  queryBlksfx,
  queryBjmx,
  queryBjrymx,
} from '@/services/ae';

export default {
  namespace: 'ce',

  state: {
    blkszzb :[],
    blksfx : [],
    bjmx : {
      data: [],
      pagination: {
        currentPage: 1,
        size: 10,
      }
    },
    timeLine: {},
    bjrymx : [],
  },

  effects: {
    // 办理科室总占比
    *fetchBlkszzb({payload}, { call, put }) {
      let blkszzb = [];
      try {
        const response = yield call(queryBlkszzb, payload);
        if (response && !response.msg) {
          const type = [];
          response.forEach( r => {
           if(r.y >0){
            type.push(r);
           }
          });
          blkszzb = type;
        }

      } catch (e) {
        console.log(e);
      }
      yield put({
        type: 'save',
        payload: {
          blkszzb,
        },
      });
    },

    // 办理科室分析
    *fetchBlksfx({payload}, { call, put }) {
      let blksfx = [];
      try {
        const response = yield call(queryBlksfx, payload);
        if (response && !response.msg) {
          blksfx = response;
        }
      } catch (e) {
        console.log(e);
      }
      yield put({
        type: 'save',
        payload: {
          blksfx,
        },
      });
    },

    // 办件明细,时间轴
    *fetchBjmx({payload}, { call, put }) {
      const bjmx = {
        data: [],
        pagination: {
          currentPage: 1,
          size: 10,
        }
      };
      let timeLine = {};
      try {
        const response = yield call(queryBjmx, payload);
        if (response && !response.msg) {
          bjmx.data = response.content.map((r, index) => ({
            ...r,
            index: index + 1,
            key : index + 1,
          }));
          bjmx.pagination = {
            pageSize: response.size,
            currentPage: response.number,
            total: response.totalElements,
          };
          if (bjmx.data.length > 0) {
            const data = bjmx.data[0];
            timeLine = {
              bllx: data.bllx,
              clTime: data.clTime,
              isOnTime: data.isOnTime,
              sjTime: data.sjTime,
              sjz: data.list,
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
      yield put({
        type: 'save',
        payload: {
          bjmx,
          timeLine,
        },
      });
    },

    // 办件人员明细
    *fetchBjrymx({payload}, { call, put }) {
      let bjrymx = [];
      try {
        const response = yield call(queryBjrymx, payload);
        if (response && !response.msg) {
          bjrymx = response.map((r ,index) =>({
            ...r,
            index: index+1,
            name: r.name,
            ks: r.unit,
            count: r.bjsl,
            time: r.zsc,
            minTime: r.zdhs,
            maxTime: r.zchs,
          }))
        }

      } catch (e) {
        console.log(e);
      }
      yield put({
        type: 'save',
        payload: {
          bjrymx,
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
        blkszzb :[],
        blksfx : [],
        bjmx : {
          data: [],
          pagination: {
            currentPage: 1,
            size: 10,
          }
        },
        timeLine: {},
        bjrymx : [],
      };
    },
  },
};
