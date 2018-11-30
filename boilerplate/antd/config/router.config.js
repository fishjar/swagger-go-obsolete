export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      // dashboard
      { path: '/', redirect: '/dashboard/index' },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        routes: [
          {
            path: '/dashboard/index',
            name: 'index',
            component: './Dashboard/Index',
          },
          {
            path: '/dashboard/foos',
            name: 'foos',
            component: './Dashboard/Foos',
            authority: ['admin'],
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
