import {
  queryQycxxwfx,
  querySxqymd,
} from '@/services/analysis';

export default {
  namespace: 'mm',

  state: {
    qycxxwfx: [],
    sxqymd: [],
  },

  effects: {
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
        qycxxwfx: [],
        sxqymd: [],
      };
    },
  },
};
