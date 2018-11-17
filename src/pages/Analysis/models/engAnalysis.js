import {
  jcxxEng,
  engRylz,
  engZxxx,
  engGcgk,
  engWttj,
  engCxtj,
  engWtfx,
  engWtlb,
  queryZlwtpm,
  engWsfx,
  engWslb,
  engCjf,
} from '@/services/analysis';

export default {
  namespace: 'engAnalysis',

  state: {
    basicInfo: {},
    rylz: [],
    zxxx: {},
    gcgk: {},
    wttj: {},
    cxtj: {},
    wtfx: [],
    wtlb: [],
    wsfx: [],
    wslb: [],
    cjf: [],
  },

  effects: {
    *fetchBasicInfo({payload}, { call, put }) {
      let basicInfo = {};
      try {
        const response = yield call(jcxxEng, payload);
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
    *fetchRylz({payload}, { call, put }) {
      let rylz = [];
      try {
        const response = yield call(engRylz, payload);
        if (response && !response.msg) {
          rylz = response;
        }
      } catch (e) {
        console.log(e);
      }
      yield put({
        type: 'save',
        payload: {
          rylz,
        },
      });
    },
    *fetchZxxx({payload}, { call, put }) {
      let zxxx = {};
      try {
        const response = yield call(engZxxx, payload);
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
    // 工程概况
    *fetchGcgk({payload}, { call, put }) {
      let gcgk = {};
      try {
        const response = yield call(engGcgk, payload);
        if (response && !response.msg) {
          gcgk = response;
        }
      } catch (e) {
        console.log(e);
      }
      yield put({
        type: 'save',
        payload: {
          gcgk,
        },
      });
    },
    // 问题统计
    *fetchWttj({payload}, { call, put }) {
      let wttj = {};
      try {
        const response = yield call(engWttj, payload);
        if (response && !response.msg) {
          wttj = response;
        }
      } catch (e) {
        console.log(e);
      }
      yield put({
        type: 'save',
        payload: {
          wttj,
        },
      });
    },
    // 诚信统计
    *fetchCxtj({payload}, { call, put }) {
      let cxtj = [];
      try {
        const response = yield call(engCxtj, payload);
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
    // 问题分析饼图
    *fetchWtfx({payload}, { call, put }) {
      let wtfx = [];
      try {
        const response = yield call(engWtfx, payload);
        if (response && !response.msg) {
          wtfx = response.sort((a, b) => a.x > b.x ? -1 : 1).map(r => ({
            value: r.value,
            type: r.x,
            name: r.y,
          }));
        }
      } catch (e) {
        console.log(e);
      }
      yield put({
        type: 'save',
        payload: {
          wtfx,
        },
      });
    },
    // 问题列表
    *fetchWtlb({payload}, { call, put }) {
      let wtlb = [];
      try {
        const response = yield call(queryZlwtpm, payload);
        if (response && !response.msg) {
          const sort = (a, b) => a.AQNum > b.AQNum ? -1 : 1;
          wtlb = response.sort(sort).map((r, index) => ({
            rank: index + 1,
            key: index + 1,
            issueDes: r.explain && r.explain === '' ? '未知问题' : r.explain,
            issueType: r.typeWT,
            issueSubType: r.typeWTZL,
            count: r.AQNum,
          }));
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
    // 文书分析
    *fetchWsfx({payload}, { call, put }) {
      let wsfx = [];
      try {
        const response = yield call(engWsfx, payload);
        if (response && !response.msg) {
          wsfx = response.map(r => ({
            ...r,
            y: r.value,
          }));
        }
      } catch (e) {
        console.log(e);
      }
      yield put({
        type: 'save',
        payload: {
          wsfx,
        },
      });
    },
    // 文书列表
    *fetchWslb({payload}, { call, put }) {
      let wslb = [];
      try {
        const response = yield call(engWslb, payload);
        if (response && !response.msg) {
          wslb = response.sort((a, b) => a.count > b.count ? -1 : 1);
        }
      } catch (e) {
        console.log(e);
      }
      yield put({
        type: 'save',
        payload: {
          wslb,
        },
      });
    },
    // 参建方
    *fetchCjf({payload}, { call, put }) {
      let cjf = [];
      try {
        const response = yield call(engCjf, payload);
        if (response && !response.msg) {
          cjf = response;
        }
      } catch (e) {
        console.log(e);
      }
      yield put({
        type: 'save',
        payload: {
          cjf,
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
        rylz: [],
        zxxx: {},
        gcgk: {},
        wttj: {},
        cxtj: {},
        wtfx: [],
        wtlb: [],
        wsfx: [],
        wslb: [],
        cjf: [],
      };
    },
  },
};
