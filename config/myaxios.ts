// import axios from 'axios';
//
// const isDev = process.env.NODE_ENV === 'development';
//
// const myAxios = axios.create({
//   baseURL: 'http://106.52.221.21:8101/api',
// })
//
// myAxios.defaults.withCredentials = true; //设置为true
//
// // Add a request interceptor
// myAxios.interceptors.request.use(function (config) {
//   console.log('我要发请求啦')
//   return config;
// }, function (error) {
//   return Promise.reject(error);
// });
//
// myAxios.interceptors.response.use(function (response) {
//   console.log('我收到你的响应啦')
//   // 未登录则跳转登录页
//   if (response?.data?.code === 40100) {
//     const redirectUrl = window.location.href;
//     window.location.href = `/user/login?=redirect=${redirectUrl}`;
//   }
//   return response.data;
// }, function (error) {
//   // Do something with response error
//   return Promise.reject(error);
// });
//
// export default myAxios;
