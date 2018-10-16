import {queryBiddingBasicInfo, queryContractAmountDataByRegion, queryFinalAccountsDataByRegion} from '@/services/contract';

export default {
  namespace: 'contract',

  state: {
    basicInfo: {},
    contractAmountDataByRegion: {},
    finalAccountsDataByRegion: {},
  },

  effects: {
    * fetchBasicInfo({payload}, {call, put}) {
      const response = yield call(queryBiddingBasicInfo, payload);
      yield put({
        type: 'save',
        payload: {
          basicInfo: response,
        },
      });
    },
    * fetchContractAmountDataByRegion({payload}, {call, put}) {
      const response = yield call(queryContractAmountDataByRegion, payload);
      yield put({
        type: 'save',
        payload: {
          contractAmountDataByRegion: response,
        },
      });
    },
    * fetchFinalAccountsDataByRegion({payload}, {call, put}) {
      const response = yield call(queryFinalAccountsDataByRegion, payload);
      yield put({
        type: 'save',
        payload: {
          finalAccountsDataByRegion: response,
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
    }
  }
}
