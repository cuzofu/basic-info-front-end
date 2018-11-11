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
      let basicInfo = {};
      try {
        const response = yield call(queryContractBasicInfo, payload);
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
    * fetchContractAmountDataByRegion({payload}, {call, put}) {
      let contractAmountDataByRegion = [];
      try {
        const response = yield call(queryContractAmountDataByRegion, payload);
        if (response && response.msg) {
          contractAmountDataByRegion = response;
        }
      } catch (e) {
        console.log(e);
      }
      yield put({
        type: 'save',
        payload: {
          contractAmountDataByRegion,
        },
      });
    },
    * fetchFinalAccountsDataByRegion({payload}, {call, put}) {
      let finalAccountsDataByRegion = [];
      try {
        const response = yield call(queryFinalAccountsDataByRegion, payload);
        if (response && response.msg) {
          finalAccountsDataByRegion = response;
        }
      } catch (e) {
        console.log(e);
      }
      yield put({
        type: 'save',
        payload: {
          finalAccountsDataByRegion,
        },
      });
    },
    * fetchYsjscytjData({payload}, {call, put}) {
      let ysjscytj = [];
      try {
        const response = yield call(queryYsjscytj, payload);
        if (response && !response.msg) {
          ysjscytj = response;
        }
      } catch (e) {
        console.log(e);
      }
      yield put({
        type: 'save',
        payload: {
          ysjscytj,
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
        contractAmountDataByRegion: [],
        finalAccountsDataByRegion: [],
        ysjscytj: [],
      }
    }
  }
}
