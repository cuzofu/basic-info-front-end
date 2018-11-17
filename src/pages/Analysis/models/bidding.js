import {
  queryBiddingBasicInfo,
  queryBiddingEngType,
  queryBiddingRegionType,
  queryGmfb,
  queryTzefb,
  queryZbfstj,
  queryEngQyzbtj,
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
    engZtbList: [],
  },

  effects: {
    * fetchBasicInfo({payload}, {call, put}) {
      let basicInfo = {};
      try {
        const response = yield call(queryBiddingBasicInfo, payload);
        if (response && !response.msg) {
          const {
            byzbs = 0,
            syzbs = 0,
            qnzbs = 0,
            list = [],
            sumCXKB = 0,
            sumLBS = 0,
            sumZBCG = 0,
            sumZBS = 0,
          } = response;
          basicInfo = {
            list: list.reverse(),
            byzbs,
            zbsTb: qnzbs === 0 ? 0 : ((byzbs - qnzbs) / qnzbs * 100).toFixed(2),
            zbsHb: syzbs === 0 ? 0 : ((byzbs - qnzbs) / qnzbs * 100).toFixed(2),
            sumLBS,
            lbl: sumZBS === 0 ? 0 : (sumLBS / sumZBS * 100).toFixed(2),
            sumCXKB,
            cxkbl: sumZBS === 0 ? 0 : (sumCXKB / sumZBS * 100).toFixed(2),
            sumZBCG,
            cgl: sumZBS === 0 ? 0 : (sumZBCG / sumZBS * 100).toFixed(2),
          };
        }
      } catch (e) {
        console.log('获取基本信息失败')
      }
      yield put({
        type: 'save',
        payload: {
          basicInfo,
        },
      });
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
        if (response && !response.msg) {
          engType = response.map( r => ({
            x: r.gcType,
            y: r.byNum,
            tb: parseFloat(r.snNum === 0 ? 0 : (r.byNum - r.snNum) / r.snNum), // 月同比
            hb: parseFloat(r.syNum === 0 ? 0 : (r.byNum - r.syNum) / r.syNum), // 月环比
          }));
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
          if (response.filter( r => r.list.length > 0).length > 0) {
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
    },
    * fetchEngQyzbtj({payload}, {call, put}) {
      let engZtbList = [];
      try {
        const response = yield call(queryEngQyzbtj, payload);
        if (response && !response.msg) {
          const sort = (a, b) => {
            if (a.tbCount === b.tbCount) {
              if (a.zbCount === b.zbCount) {
                if (a.wzCount > b.wzCount) {
                  return -1;
                }
                return 1;
              }
              if (a.zbCount > b.zbCount) {
                return -1;
              }
              return 1;
            }
            if (a.tbCount > b.tbCount) {
              return -1;
            }
            return 1;
          };
          engZtbList = response.sort(sort).map((r, index) => ({
            engName: r.cioName,
            rank: index + 1,
            zbl: r.tbCount === 0 ? 0 : (r.zbCount / r.tbCount * 100).toFixed(2),
            wzl: r.tbCount === 0 ? 0 : (r.wzCount / r.tbCount * 100).toFixed(2),
            ...r,
          }));
        }
      } catch (e) {
        console.log('获取数据失败')
      }
      yield put({
        type: 'save',
        payload: {
          engZtbList,
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
        engZtbList: [],
      };
    },
  }
}
