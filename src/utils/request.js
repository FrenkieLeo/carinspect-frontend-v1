import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
// import Qs from 'qs'

// create an axios instance
const service = axios.create({
  baseURL: 'http://localhost:27081/',
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: false, // send cookies when cross-domain requests
  responseType: 'json',
  params: {},
  maxRedirects: 5,
  headers: {
    // 公共请求头配置，本项目请求头大多数接口是这个，所以这里可以配置一下，对于特殊接口单独配置
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // 请求拦截就是再发ajax之前做些什么！！
    if (store.getters.token) {
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    switch (config.method) {
      case 'get':
        if (!config.params) {
          config.params = {}
        }
        config.headers['Content-Type'] = 'application/json'
        break
      case 'post':
        console.log('request', config)
        if (!config.data) {
          config.data = {}
        }
        // if (config.responseType === 'json') {
        //   config.data = Qs.stringify(config.data) // 配套application/x-www-form-urlencoded使用
        // } else {
        config.headers['Content-Type'] = 'application/json' // 配套application/json使用
        // }
        break
      default:
    }
    console.log(`【request】url:${config.url},data:${config.data} `)
    return config
  },
  error => {
    // do something with request error
    console.log('request.js', error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    const code = parseInt(res.code) || 0
    // if the custom code is not 20000, it is judged as an error.
    if (code !== 20000) {
      Message({
        message: { message: res.message || 'Error' },
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (code === 50008 || code === 50012 || code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
