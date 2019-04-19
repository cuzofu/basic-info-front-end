import {
  queryQycxxwfx,
  querySxqymd,
  queryQycxdjtj,
  queryBqqycxpm,
} from '@/services/analysis';

export default {
  namespace: 'mm',

  state: {
    qycxdjtj :[],
    qycxxwfx: [],
    sxqymd: [],
    bqqycxpm: {
      data: [],
      pagination: {
        current: 0,
        pageSize: 10,
      }
    },
  },

  effects: {

    // 企业诚信等级统计
    *fetchQycxdjtj({payload}, { call, put }) {
      let qycxdjtj = [];
      try {
        const response = yield call(queryQycxdjtj, payload);
        if (response && !response.msg) {
          qycxdjtj = response;
        }
      } catch (e) {
        console.log(e);
      }
      yield put({
        type: 'save',
        payload: {
          qycxdjtj,
        },
      });
    },

    // 本期企业诚信排名
    *fetchBqqycxpm({payload}, { call, put }) {
      const bqqycxpm = {
        data: [],
        pagination: {
          current: 0,
          pageSize: 10,
        }
      };
      try {
        const response = yield call(queryBqqycxpm, payload);
        if (response && !response.msg) {
          bqqycxpm.data = response.content.map((r,index) =>({
            key: index+1,
            rank: index+1,
            orgName: r.qymc,
            score: r.bqfs,
            creditScore: r.cxfs,
            creditLevel: r.qydj,
          }));
          bqqycxpm.pagination = {
            pageSize: response.size,
            current: response.number + 1,
            total: response.totalElements,
          };
        }
      } catch (e) {
        console.log(e);
      }
      yield put({
        type: 'save',
        payload: {
          bqqycxpm,
        },
      });
    },

    // 企业诚信行为分析
    *fetchQycxxwfx({payload}, { call, put }) {
      let qycxxwfx = [];
      try {
        const response = yield call(queryQycxxwfx, payload);
        if (response && !response.msg) {
          qycxxwfx = [
            {
              x: '企业入库总数',
              y: response.qyrkNum
            },
            {
              x: '企业诚信记分',
              y: response.cxjfNum,
            },
            {
              x: '良好行为加分',
              y: response.lhjfNum,
            },
            {
              x: '不良行为扣分',
              y: response.bljfNum,
            },
            {
              x: '失信企业',
              y: response.sxqyNum,
            },
          ];
        }
      } catch (e) {
        console.log(e);
      }
      yield put({
        type: 'save',
        payload: {
          qycxxwfx,
        },
      });
    },
    // 失信企业名单
    *fetchSxqymd({payload}, { call, put }) {
      let sxqymd = [];
      try {
        const response = yield call(querySxqymd, payload);
        if (response && !response.msg) {
          sxqymd = response.sort((a, b) => a.cxfs > b.cxfs ? -1 : 1).map((r, index) => ({
            rank: index+1,
            orgName: r.qymc,
            creditScore: r.cxfs,
            creditLevel: r.qydj,
            ...r,
          }));
        }
      } catch (e) {
        console.log(e);
      }
      yield put({
        type: 'save',
        payload: {
          sxqymd,
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
        qycxdjtj : [],
        qycxxwfx: [],
        sxqymd: [],
        bqqycxpm: {
          data: [],
          pagination: {
            current: 0,
            pageSize: 10,
          }
        },
      };
    },
  },
};
