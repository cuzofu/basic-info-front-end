import {
  queryContractBasicInfo,
  queryContractAmountDataByRegion,
  queryFinalAccountsDataByRegion,
  queryYsjscytj,
} from '@/services/contract';

export default {
  namespace: 'contract',

  state: {
    basicInfo: {},
    contractAmountDataByRegion: [],
    finalAccountsDataByRegion: [],
    ysjscytj: [],
  },

  effects: {
    * fetchBasicInfo({payload}, {call, put}) {
      try {
        const response = yield call(queryContractBasicInfo, payload);
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
    * fetchContractAmountDataByRegion({payload}, {call, put}) {
      try {
        const response = yield call(queryContractAmountDataByRegion, payload);
        console.log(response);
        yield put({
          type: 'save',
          payload: {
            contractAmountDataByRegion: response || [],
          },
        });
      } catch (e) {
        yield put({
          type: 'save',
          payload: {
            contractAmountDataByRegion: [],
          },
        });
      }
    },
    * fetchFinalAccountsDataByRegion({payload}, {call, put}) {
      try {
        const response = yield call(queryFinalAccountsDataByRegion, payload);
        yield put({
          type: 'save',
          payload: {
            finalAccountsDataByRegion: response || [],
          },
        });
      } catch (e) {
        yield put({
          type: 'save',
          payload: {
            finalAccountsDataByRegion: [],
          },
        });
      }
    },
    * fetchYsjscytjData({payload}, {call, put}) {
      try {
        const response = yield call(queryYsjscytj, payload);
        yield put({
          type: 'save',
          payload: {
            ysjscytj: response || [],
          },
        });
      } catch (e) {
        yield put({
          type: 'save',
          payload: {
            ysjscytj: [],
          },
        });
      }
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
        contractAmountDataByRegion: [],
        finalAccountsDataByRegion: [],
        ysjscytj: [],
      }
    }
  }
}
