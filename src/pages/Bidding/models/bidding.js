import {
  queryBiddingBasicInfo,
  queryBiddingEngType,
  queryBiddingRegionType,
  queryGmfb,
  queryTzefb,
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
  },

  effects: {
    * fetchBasicInfo({payload}, {call, put}) {
      try {
        const response = yield call(queryBiddingBasicInfo, payload);
        console.log(response);
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
        if (response) {
          if (response.msg) {
            regionType = [];
          } else {
            regionType = response.map( r => {
              const rtn = {
                groupX: r.groupX,
                groupY: r.groupY,
              };
              rtn.value = sum(response, r.groupY) === 0 ? 0 : parseFloat(r.value) / sum(response, r.groupY);
              return rtn;
            });
          }
        } else {
          regionType = [];
        }
      } catch (e) {
        regionType = [];
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
        if (response) {
          if (response.msg) {
          } else {
            gmfb = response;
          }
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
        console.log(response);
        if (response) {
          if (response.msg) {
          } else {
            tzefb = response;
          }
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
      };
    },
  }
}
