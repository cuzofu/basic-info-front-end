import { queryBasicInfo } from '@/services/corporation';
import {
  queryQyZxxx,
  queryQyCjqk,
  queryQyBlxwtj,
  queryQyCxtj,
  queryQyBlxwkf,
  queryQyWtlb,
  queryGcgmfx,
  queryGcgmfxlb,
} from '@/services/analysis';

export default {
  namespace: 'corpAnalysis',

  state: {
    basicInfo: {},
    zxxx: [],
    cjqk: {},
    cxtj: {},
    blxwkf: [],
    wtlb: [],
    gcgmfx: [],
    gcgmfxlb: {
      list: [],
      pagination: false,
    },
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
        console.log(e);
      }
      yield put({
        type: 'save',
        payload: {
          basicInfo,
        },
      });
    },
    *fetchZxxx({payload}, { call, put }) {
      let zxxx = [];
      try {
        const response = yield call(queryQyZxxx, payload);
        if (response && !response.msg) {
          zxxx = response;
        }
      } catch (e) {
        console.log(e);
      }
      yield put({
        type: 'save',
        payload: {
          zxxx,
        },
      });
    },
    *fetchCjqk({payload}, { call, put }) {
      let cjqk = {};
      try {
        const response = yield call(queryQyCjqk, payload);
        if (response && !response.msg) {
          cjqk = response;
        }
      } catch (e) {
        console.log(e);
      }
      yield put({
        type: 'save',
        payload: {
          cjqk,
        },
      });
    },
    *fetchBlxwtj({payload}, { call, put }) {
      let blxwtj = {};
      try {
        const response = yield call(queryQyBlxwtj, payload);
        if (response && !response.msg) {
          blxwtj = response;
        }
      } catch (e) {
        console.log(e);
      }
      yield put({
        type: 'save',
        payload: {
          blxwtj,
        },
      });
    },
    *fetchCxtj({payload}, { call, put }) {
      let cxtj = {};
      try {
        const response = yield call(queryQyCxtj, payload);
        if (response && !response.msg) {
          cxtj = response;
        }
      } catch (e) {
        console.log(e);
      }
      yield put({
        type: 'save',
        payload: {
          cxtj,
        },
      });
    },
    *fetchBlxwkf({payload}, { call, put }) {
      let blxwkf = [];
      try {
        const response = yield call(queryQyBlxwkf, payload);
        if (response && !response.msg) {
          blxwkf = response.map(r => ({
            x: r.xwType,
            y: r.xwTypeNum,
          }));
        }
      } catch (e) {
        console.log(e);
      }
      yield put({
        type: 'save',
        payload: {
          blxwkf,
        },
      });
    },
    *fetchWtlb({payload}, { call, put }) {
      let wtlb = [];
      try {
        const response = yield call(queryQyWtlb, payload);
        if (response && !response.msg) {
          wtlb = response.sort((a, b) => a.wtTypeNum > b.wtTypeNum ? -1 : 1);
        }
      } catch (e) {
        console.log(e);
      }
      yield put({
        type: 'save',
        payload: {
          wtlb,
        },
      });
    },
    *fetchGcgmfx({payload}, { call, put }) {
      let gcgmfx = [];
      try {
        const response = yield call(queryGcgmfx, payload);
        if (response && !response.msg) {
          gcgmfx = response.map(r => ({
            ...r,
            x: r.guiMo,
            y: r.guiMoNum,
          }));
        }
      } catch (e) {
        console.log(e);
      }
      yield put({
        type: 'save',
        payload: {
          gcgmfx,
        },
      });
    },
    *fetchGcgmfxlb({payload}, { call, put }) {
      const gcgmfxlb = {
        list: [],
        pagination: false,
      };
      try {
        const response = yield call(queryGcgmfxlb, payload);
        if (response && !response.msg) {
          gcgmfxlb.list = response.list.map((r, index) => ({
            key: index + 1,
            index: index + 1,
            engType: r.gcType,
            engName: r.gcName,
            investment: r.gcTZE,
          }));
          gcgmfxlb.pagination = response.pagination;
        }
      } catch (e) {
        console.log(e);
      }
      yield put({
        type: 'save',
        payload: {
          gcgmfxlb,
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
        zxxx: [],
        cjqk: {},
        cxtj: {},
        blxwkf: [],
        wtlb: [],
        gcgmfx: [],
        gcgmfxlb: {
          list: [],
          pagination: false,
        },
      };
    },
  },
};
