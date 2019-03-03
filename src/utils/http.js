import axios from 'axios'
import qs from 'qs'
import router from '../router'
import { Message } from 'element-ui';

// http request 拦截器
axios.interceptors.request.use(
    config => {
      if (localStorage.getItem('user_token')) {
        config.headers.Authorization = localStorage.getItem('user_token')
      }
      return config
    },
    err => {
      return Promise.reject(err)
    }
  )
  
  // http response 拦截器
  axios.interceptors.response.use(
    response => {
     
      return response
    },
    error => {
      if (error.response) {
        console.log(error.response.status)
        switch (error.response.status) {
        
          case 401:
             // 401 清除token信息并跳转到登录页面
            //store.commit(USER_LOGINOUT)
            localStorage.removeItem('user_token');
            router.replace({
              path: '/login',
              query: {redirect: router.currentRoute.fullPath}
            })
            break
            case 403:
                router.push('404')
            break
            case 500:
              let message_conf = {
                showClose: true,
                message: '服务器内部错误...',
                type: 'error',
              }
              Message(message_conf)
            break
            case 504:
            let message_504 = {
                showClose: true,
                message: '请求服务器超时...',
                type: 'error',
              }
              Message(message_504)
          break
           
        }
      }
      return Promise.reject(error.response.data)
    }
  )
    
function http (method, url, param) {
    param = param && typeof param === 'object' ? param : {};
    const config = {
        url: url,
        method: method,
        transformRequest: [function (param) {
           
            return qs.stringify(param);
        }],
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    };

    // post请求时需要设定Content-Type
    if (method == 'post') {
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        config.data = param;
    } else if (method === 'get') {
        config.params = param;
    }
    return axios(config);
}

export {
    http
};