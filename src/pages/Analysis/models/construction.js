import { queryEngList, queryCorpList } from '@/services/analysis';

export default {
  namespace: 'construction',

  state: {
    engList: {
      data: [],
      pagination: {
        pageSize: 5,
      }
    },
    corpList: {
      data: [],
      pagination: {
        pageSize: 5,
      }
    },
  },

  effects: {
    *fetchEngList({payload}, { call, put }) {
      try {
        const response = yield call(queryEngList, payload);
        yield put({
          type: 'save',
          payload: {
            engList: {
              data: [
                {
                  id: 1,
                  engName: '伍家岗长江大桥伍家岗长江大桥伍家岗长江大桥伍家岗长江大桥伍家岗长江大桥1',
                  investment: 4500,
                  dimensions: 12399,
                  alertType: '整改通知',
                  alertContext: '安全隐患整改通知',
                  engType: '市政工程',
                  zbType: '公开招标',
                },
                {
                  id: 2,
                  engName: '伍家岗长江大桥2',
                  investment: 4500,
                  dimensions: 12399,
                  alertType: '停工通知',
                  alertContext: '质量停工整改通知',
                  engType: '市政工程',
                  zbType: '公开招标',
                },
                {
                  id: 3,
                  engName: '伍家岗长江大桥3',
                  investment: 4500,
                  dimensions: 12399,
                  alertType: '整改通知',
                  alertContext: '安全隐患整改通知',
                  engType: '市政工程',
                  zbType: '公开招标',
                },
                {
                  id: 4,
                  engName: '伍家岗长江大桥4',
                  investment: 4500,
                  dimensions: 12399,
                  alertType: '整改通知',
                  alertContext: '安全隐患整改通知',
                  engType: '市政工程',
                  zbType: '公开招标',
                },
                {
                  id: 5,
                  engName: '伍家岗长江大桥5',
                  investment: 4500,
                  dimensions: 12399,
                  alertType: '整改通知',
                  alertContext: '安全隐患整改通知',
                  engType: '市政工程',
                  zbType: '公开招标',
                },
                {
                  id: 6,
                  engName: '伍家岗长江大桥6',
                  investment: 4500,
                  dimensions: 12399,
                  alertType: '整改通知',
                  alertContext: '安全隐患整改通知',
                  engType: '市政工程',
                  zbType: '公开招标',
                }
              ],
              pagination: {
                pageSize: 5,
              }
            }
          },
        });
      } catch (e) {
        console.log(e);
        yield put({
          type: 'save',
          payload: {
            engList: {
              data: [
                {
                  id: 1,
                  engName: '伍家岗长江大桥伍家岗长江大桥伍家岗长江大桥伍家岗长江大桥伍家岗长江大桥1',
                  investment: 4500,
                  dimensions: 12399,
                  alertType: '整改通知',
                  alertContext: '安全隐患整改通知',
                  engType: '市政工程',
                  zbType: '公开招标',
                },
                {
                  id: 2,
                  engName: '伍家岗长江大桥2',
                  investment: 4500,
                  dimensions: 12399,
                  alertType: '停工通知',
                  alertContext: '质量停工整改通知',
                  engType: '市政工程',
                  zbType: '公开招标',
                },
                {
                  id: 3,
                  engName: '伍家岗长江大桥3',
                  investment: 4500,
                  dimensions: 12399,
                  alertType: '整改通知',
                  alertContext: '安全隐患整改通知',
                  engType: '市政工程',
                  zbType: '公开招标',
                },
                {
                  id: 4,
                  engName: '伍家岗长江大桥4',
                  investment: 4500,
                  dimensions: 12399,
                  alertType: '整改通知',
                  alertContext: '安全隐患整改通知',
                  engType: '市政工程',
                  zbType: '公开招标',
                },
                {
                  id: 5,
                  engName: '伍家岗长江大桥5',
                  investment: 4500,
                  dimensions: 12399,
                  alertType: '整改通知',
                  alertContext: '安全隐患整改通知',
                  engType: '市政工程',
                  zbType: '公开招标',
                },
                {
                  id: 6,
                  engName: '伍家岗长江大桥6',
                  investment: 4500,
                  dimensions: 12399,
                  alertType: '整改通知',
                  alertContext: '安全隐患整改通知',
                  engType: '市政工程',
                  zbType: '公开招标',
                }
              ],
              pagination: {
                pageSize: 5,
              }
            }
          },
        });
      }
    },
    *fetchCorpList({payload}, { call, put }) {
      const response = yield call(queryCorpList, payload);
      yield put({
        type: 'save',
        payload: {
          corpList: {
            data: [
              {
                id: 1,
                corpName: '宜昌博高建筑工程有限公司',
                creditLevel: 'A',
                creditScore: 388,
                alertType: '诚信加分',
                alertContext: '共加分25分，共5次',
                corpType: '建筑业企业',
                regionType: '本地企业',
              },
              {
                id: 2,
                corpName: '湖北广盛建设集团有限责任公司',
                creditLevel: 'A',
                creditScore: 211,
                alertType: '证书预警',
                alertContext: '到期时间：2018年10月5日',
                corpType: '建筑业企业',
                regionType: '本地企业',
              },
              {
                id: 3,
                corpName: '湖北龙腾园林工程有限公司',
                creditLevel: 'C',
                creditScore: 60,
                alertType: '诚信扣分',
                alertContext: '共扣分15分，共3次',
                corpType: '建筑业企业',
                regionType: '本地企业',
              },
              {
                id: 4,
                corpName: '孝昌县建筑工程集团有限公司',
                creditLevel: 'B',
                creditScore: 90,
                alertType: '诚信加分',
                alertContext: '共扣分10分，共1次',
                corpType: '建筑业企业',
                regionType: '本地企业',
              },
              {
                id: 5,
                corpName: '长阳超越建筑安装有限公司',
                creditLevel: 'B',
                creditScore: 90,
                alertType: '人员预警',
                alertContext: '登记人员：10人；押证人员：10人；',
                corpType: '建筑业企业',
                regionType: '本地企业',
              },
              {
                id: 6,
                corpName: '长阳隔河岩建筑工程有限责任公司',
                creditLevel: 'A',
                creditScore: 120,
                alertType: '诚信加分',
                alertContext: '共加分15分，共2次',
                corpType: '建筑业企业',
                regionType: '本地企业',
              }
            ],
            pagination: {
              pageSize: 5,
            }
          },
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
        corpList: {
          data: [],
          pagination: {
            pageSize: 5,
          }
        },
      };
    },
  },
};
