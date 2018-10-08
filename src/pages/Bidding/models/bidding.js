import {queryBiddingBasicInfo, queryBiddingEngType} from '@/services/bidding';

export default {
  namespace: 'bidding',

  state: {
    basicInfo: {},
    engType: {},
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
    * fetchEngType({payload}, {call, put}) {
      const response = yield call(queryBiddingEngType, payload);
      yield put({
        type: 'save',
        payload: {
          engType: response,
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
    }
  }
}
