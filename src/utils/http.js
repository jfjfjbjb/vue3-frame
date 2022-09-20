import axios from 'axios';

const http = axios.create({
  baseURL: './',
  timeout: 10000
});

// Add a request interceptor
http.interceptors.request.use(
  function (config) {
    // 记录cancelToken，路由切换时取消
    config.cancelToken = new axios.CancelToken((cancel) => {
      window._axiosPromiseArr.push(cancel);
      if (config.cancelHandler) {
        config.cancelHandler(cancel);
      }
    });
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
http.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default http;
