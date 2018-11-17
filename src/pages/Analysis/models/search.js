import {
  searchOrg,
  searchEng,
  searchPerson,
} from '@/services/analysis';

export default {
  namespace: 'search',

  state: {
    orgList: {
      data: [],
      pagination: false,
    },
    engList: {
      data: [],
      pagination: false,
    },
    personList: {
      data: [],
      pagination: false,
    },
  },

  effects: {
    *searchOrg({payload}, { call, put }) {
      let orgList = {
        data: [],
        pagination: false,
      };
      try {
        const response = yield call(searchOrg, payload);
        if (response && !response.msg) {
          orgList = {
            data: response.data.map(r => {
              const {jcxxMx} = r;
              return {
                ...r,
                ...JSON.parse(jcxxMx),
              }
            }),
            pagination: response.pagination,
          };
        }
      } catch (e) {
        console.log('获取企业列表失败');
      }
      yield put({
        type: 'save',
        payload: {
          orgList,
        },
      });
    },
    *searchPerson({payload}, { call, put }) {
      let personList = {
        data: [],
        pagination: false,
      };
      try {
        const response = yield call(searchPerson, payload);
        if (response && !response.msg) {
          const data = [];
          response.data.forEach(r => {
            const {jcxxMx} = r;
            try {
              data.push({
                ...r,
                ...JSON.parse(jcxxMx),
              });
            } catch (e) {
              console.log(e);
            }
          });
          personList = {
            data,
            pagination: response.pagination,
          };
        }
      } catch (e) {
        console.log('获取人员列表失败');
      }
      yield put({
        type: 'save',
        payload: {
          personList,
        },
      });
    },
    *searchEng({payload}, { call, put }) {
      let engList = {
        data: [],
        pagination: false,
      };
      try {
        const response = yield call(searchEng, payload);
        if (response && !response.msg) {
          const data = [];
          response.data.forEach(r => {
            const {engMx} = r;
            try {
              data.push({
                ...r,
                ...JSON.parse(engMx),
              })
            } catch (e) {
              console.log(e);
            }
          });
          engList = {
            data,
            pagination: response.pagination,
          };
        }
      } catch (e) {
        console.log('获取工程列表失败');
      }
      yield put({
        type: 'save',
        payload: {
          engList,
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
        orgList: {
          data: [],
          pagination: false,
        },
        engList: {
          data: [],
          pagination: false,
        },
        personList: {
          data: [],
          pagination: false,
        },
      };
    },
  },
};
