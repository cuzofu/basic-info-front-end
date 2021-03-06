export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    // Routes: ['src/pages/Authorized'],
    routes: [
      { path: '/', redirect: '/analysis/market' },
      {
        path: '/analysis',
        name: 'analysis',
        icon: 'line-chart',
        component: './Analysis/Analysis',
        routes: [
          {
            path: '/analysis',
            redirect: '/analysis/market',
          },
          {
            path: '/analysis/market',
            name: 'market',
            component: './Analysis/Market',
          },
          {
            path: '/analysis/construction',
            name: 'construction',
            component: './Analysis/Construction',
          },
          {
            path: '/analysis/credit',
            name: 'credit',
            component: './Analysis/Credit',
          },
          {
            path: '/analysis/badBehavior',
            name: 'badBehavior',
            component: './Analysis/BadBehavior',
          },
          {
            path: '/analysis/intendance',
            name: 'intendance',
            component: './Analysis/Intendance',
          },
          {
            path: '/analysis/bidding',
            name: 'bidding',
            component: './Analysis/Bidding',
          },
          {
            path: '/analysis/contract',
            name: 'contract',
            component: './Analysis/Contract',
          },
          {
            path: '/analysis/search',
            name: 'search',
            component: './Analysis/Search',
          },
          {
            path: '/analysis/mm',
            name: 'mm',
            component: './Analysis/MarketMonitor',
          },
          {
            path: '/analysis/ce',
            name: 'ce',
            component: './Analysis/ConstructionEfficiency',
          },
          {
            path: '/analysis/ae',
            name: 'ae',
            component: './Analysis/AdministrativeEfficiency',
          },
          {
            path: '/analysis/engs',
            name: 'engs',
            component: './Analysis/EngList',
          },
        ],
      },
      {
        path: '/eng/analysis/:id',
        name: 'engAnalysis',
        component: './Analysis/EngAnalysis',
      },
      {
        path: '/corp/analysis/:id',
        name: 'corpAnalysis',
        component: './Analysis/CorpAnalysis',
      },
      {
        path: '/corporation/:id',
        name: 'corporation',
        icon: 'profile',
        component: './Corporation/Corporation',
      },
      {
        path: '/person/:id',
        name: 'person',
        icon: 'profile',
        component: './Person/Person',
      },
      {
        name: 'account',
        icon: 'user',
        path: '/account',
        routes: [
          {
            path: '/account/settings',
            name: 'settings',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
              {
                path: '/account/settings/binding',
                component: './Account/Settings/BindingView',
              },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
              },
            ],
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
