export default [
  { name:'登录',path: '/user', layout: false, routes: [{ path: '/user/login', component: './User/Login' }] },
  { name:'注册',path: '/user', layout: false, routes: [{ path: '/user/register', component: './User/Register' }] },

  { path: '/', redirect: '/add_chart' },
  { name:'智能分析',path: '/add_chart', icon: 'BarChartOutlined', component: './AddChart' },
  { name:'智能分析（异步）',path: '/add_chart_async', icon: 'BarChartOutlined', component: './AddChartAsync' },
  { name:'我的图表',path: '/my_chart', icon: 'pieChart', component: './MyChart' },
  { path: '/myinfo', name: '我的信息', icon: 'UnorderedListOutlined', component: './User/settings' },

  {
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    name:'管理员页面',
    routes: [
      { path: '/admin', redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', component: './Admin' },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
