export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/summary',
                name: 'welcome',
                icon: 'InfoCircleOutlined',
                routes: [
                  {
                    path: '/summary',
                    component: './Summary',
                    hideInMenu: true,
                  },
                  {
                    path: 'summary/:id',
                    name: 'details',
                    component: './Details',
                    hideInMenu: true,
                  },
                ]
              },
              {
                path: '/information',
                name: 'information',
                icon: 'LineChartOutlined',
                component: './Information',
                authority: ['admin'],
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
