import { queryEngList, queryCorpList } from '@/services/analysis';

export default {
  namespace: 'construction',

  state: {
    engList: {
      list: [],
      pagination: {
        pageSize: 10,
      }
    },
    corpList: [],
  },

  effects: {
    *fetchEngList({payload}, { call, put }) {
      let engList = {
        list: [],
        pagination: {
          pageSize: 10,
        }
      };
      try {
        const response = yield call(queryEngList, payload);
        console.log(response);
        if (response && !response.msg) {
          engList = response;
        }
      } catch (e) {
        console.log('获取（工程列表）数据失败');
      }
      yield put({
        type: 'save',
        payload: {
          engList,
        },
      });
    },
    *fetchCorpList({payload}, { call, put }) {
      let corpList = [];
      try {
        const response = yield call(queryCorpList, payload);
        console.log(response);
        if (response && !response.msg) {
          corpList = response.map( r => ({
            id: r.id,
            key: r.key,
            corpName: r.cioName,
            creditLevel: r.creditLevel,
            creditScore: r.creditScore,
            alertType: r.yjlx,
            alertContext: r.yjms,
            corpType: r.qylx,
            regionType: r.cioType,
          }));
        }
      } catch (e) {
        console.log('获取（企业列表）数据失败');
      }
      yield put({
        type: 'save',
        payload: {
          corpList,
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
        engList: {
          data: [],
          pagination: {
            pageSize: 5,
          }
        },
        corpList: [],
      };
    },
  },
};
