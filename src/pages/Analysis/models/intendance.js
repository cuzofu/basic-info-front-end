import {
  queryZfwsks,
  queryZfwstj,
  queryZlwtpm,
  queryZfwsGcpm,
  queryZfwsQypm,
  queryGczlwtpm,
} from '@/services/analysis';

export default {
  namespace: 'intendance',

  state: {
    zfwsks: [],
    zfwstj: [],
    zlwtpm: [],
    zfwsGcpm: [],
    zfwsQypm: [],
    gczlwtpm: [],
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
    // 执法文书统计
    *fetchZfwstjData({payload}, { call, put }) {
      let zfwstj = [];
      try {
        const response = yield call(queryZfwstj, payload);
        if (response && !response.msg) {
          zfwstj = response;
        }
      } catch (e) {
        console.log('获取（执法文书统计）数据失败');
      }
      yield put({
        type: 'save',
        payload: {
          zfwstj,
        },
      });
    },
    // 项目排名占比
    *fetchZlwtpmData({payload}, { call, put }) {
      let zlwtpm = [];
      try {
        const response = yield call(queryZlwtpm, payload);
        if (response && !response.msg) {
          const sort = (a, b) => a.AQNum > b.AQNum ? -1 : 1;
          zlwtpm = response.sort(sort).map((r, index) => ({
            rank: index + 1,
            key: index + 1,
            issueDes: r.explain && r.explain === '' ? '未知问题' : r.explain,
            issueType: r.typeWT,
            issueSubType: r.typeWTZL,
            count: r.AQNum,
          }));
        }
      } catch (e) {
        console.log('获取（工程排名）数据失败');
      }
      yield put({
        type: 'save',
        payload: {
          zlwtpm,
        },
      });
    },
    // 工程排名（执法文书）
    *fetchZfwsGcpmData({payload}, { call, put }) {
      let zfwsGcpm = [];
      try {
        const response = yield call(queryZfwsGcpm, payload);
        if (response && !response.msg) {
          const total = response.reduce((pre, now) => now.ZLNum + pre, 0);
          const sort = (a, b) => a.ZLNum > b.ZLNum ? -1 : 1;
          zfwsGcpm = response.sort(sort).map((r, index) => ({
            rank: index + 1,
            key: r.GCId,
            engName: r.GCName,
            count: r.ZLNum,
            rate: total > 0 ? (r.ZLNum / total * 100).toFixed(2) : 0,
          }));
        }
      } catch (e) {
        console.log('获取（执法文书工程排名）数据失败');
      }
      yield put({
        type: 'save',
        payload: {
          zfwsGcpm,
        },
      });
    },
    // 企业排名（执法文书）
    *fetchZfwsQypmData({payload}, { call, put }) {
      let zfwsQypm = [];
      try {
        const response = yield call(queryZfwsQypm, payload);
        if (response && !response.msg) {
          const total = response.reduce((pre, now) => now.ZLNum + pre, 0);
          const sort = (a, b) => a.ZLNum > b.ZLNum ? -1 : 1;
          zfwsQypm = response.sort(sort).map((r, index) => ({
            rank: index + 1,
            key: index + 1,
            orgName: r.GCName,
            count: r.ZLNum,
            rate: total > 0 ? (r.ZLNum / total * 100).toFixed(2) : 0,
          }));
        }
      } catch (e) {
        console.log('获取（执法文书工程排名）数据失败');
      }
      yield put({
        type: 'save',
        payload: {
          zfwsQypm,
        },
      });
    },
    // 工程排名（按问题）
    *fetchGczlwtpmData({payload}, { call, put }) {
      let gczlwtpm = [];
      try {
        const response = yield call(queryGczlwtpm, payload);
        if (response && !response.msg) {
          const sort = (a, b) => (a.AQNum + a.ZLNum) > (b.AQNum + b.ZLNum) ? -1 : 1;
          const responseSorted = response.sort(sort);
          const top5 = responseSorted.length >= 5 ? responseSorted.slice(0, 5) : responseSorted;
          gczlwtpm = top5.map((r, index) => ({
            rank: `No.${index+1}`,
            engName: r.GCName,
            "质量问题": r.ZLNum,
            "安全问题": r.AQNum,
          }));
        }
      } catch (e) {
        console.log('获取（执法文书工程排名）数据失败');
      }
      yield put({
        type: 'save',
        payload: {
          gczlwtpm,
        },
      });
    },
    // 工程常见问题统计

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
        zfwstj: [],
        zlwtpm: [],
        zfwsGcpm: [],
        zfwsQypm: [],
        gczlwtpm: [],
      };
    },
  },
};
