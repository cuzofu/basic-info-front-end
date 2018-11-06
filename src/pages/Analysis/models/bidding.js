import {
  queryBiddingBasicInfo,
  queryBiddingEngType,
  queryBiddingRegionType,
  queryGmfb,
  queryTzefb,
  queryZbfstj,
} from '@/services/bidding';

const sum = (data, key1) => data.filter( r => r.groupY === key1).reduce((pre, now) => parseInt(now.value, 0) + pre, 0);

export default {
  namespace: 'bidding',

  state: {
    basicInfo: {},
    engType: [],
    regionType: [],
    gmfb: {
      listgls: [],
      listmje: [],
    },
    tzefb: [],
    zbfstj: [],
  },

  effects: {
    * fetchBasicInfo({payload}, {call, put}) {
      try {
        const response = yield call(queryBiddingBasicInfo, payload);
        yield put({
          type: 'save',
          payload: {
            basicInfo: response || {},
          },
        });
      } catch (e) {
        yield put({
          type: 'save',
          payload: {
            basicInfo: {},
          },
        });
      }
    },
    * fetchRegionType({payload}, {call, put}) {
      let regionType = [];
      try {
        const response = yield call(queryBiddingRegionType, payload);
        if (response && !response.msg) {
          regionType = response.map( r => {
            const rtn = {
              groupX: r.groupX,
              groupY: r.groupY,
            };
            rtn.value = sum(response, r.groupY) === 0 ? 0 : parseFloat(r.value) / sum(response, r.groupY);
            return rtn;
          });
        }
      } catch (e) {
        console.log('获取（区域类型）数据失败')
      }
      yield put({
        type: 'save',
        payload: {
          regionType,
        },
      });
    },
    * fetchEngType({payload}, {call, put}) {
      let engType = [];
      try {
        const response = yield call(queryBiddingEngType, payload);
        if (response) {
          if (response.msg) {
            engType = [];
          } else {
            engType = response;
          }
        } else {
          engType = [];
        }
      } catch (e) {
        engType = [];
      }
      yield put({
        type: 'save',
        payload: {
          engType,
        },
      });
    },
    * fetchGmfb({payload}, {call, put}) {
      let gmfb = {
        listgls: [],
        listmje: [],
      };
      try {
        const response = yield call(queryGmfb, payload);
        if (response && !response.msg) {
          gmfb = response;
        }
      } catch (e) {
        console.log('获取规模分布数据失败')
      }
      yield put({
        type: 'save',
        payload: {
          gmfb,
        },
      });
    },
    * fetchTzefb({payload}, {call, put}) {
      let tzefb = [];
      try {
        const response = yield call(queryTzefb, payload);
        if (response && !response.msg) {
          tzefb = response;
        }
      } catch (e) {
        console.log('获取投资额分布数据失败')
      }
      yield put({
        type: 'save',
        payload: {
          tzefb,
        },
      });
    },
    * fetchZbfstj({payload}, {call, put}) {
      let zbfstj = [];
      try {
        const response = yield call(queryZbfstj, payload);
        if (response && !response.msg) {
          const total = [{
            zbfs: '合计',
            count: response.reduce((pre, now) => ((now.count - 0) + pre), 0),
            zbje: response.reduce((pre, now) => ((now.zbje - 0) + pre), 0),
            zbmj: response.reduce((pre, now) => ((now.zbmj - 0) + pre), 0),
            gls: response.reduce((pre, now) => ((now.gls - 0) + pre), 0),
          }];
          zbfstj = response.concat(total);
        }
      } catch (e) {
        console.log('获取数据失败')
      }
      yield put({
        type: 'save',
        payload: {
          zbfstj,
        },
      });
    }
  },

  reducers: {
    save(state, {payload}) {
      return {
        ...state,
        ...payload,
      }
    },
    clear() {
      return {
        basicInfo: {},
        engType: [],
        regionType: [],
        gmfb: {
          listgls: [],
          listmje: [],
        },
        tzefb: [],
        zbfstj: [],
      };
    },
  }
}
