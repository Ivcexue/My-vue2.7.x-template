import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'

const ERROR_OK = 200
const ERROR_CODE_MESSAGE = {
  400: '请求错误(400)',
  401: '未授权，请重新登录(401)',
  403: '无访问或操作权限(403)',
  404: '请求出错(404),未找到文件',
  500: '后台异常(500)',
  501: '服务未实现(501)',
  502: '网络错误(502)',
  503: '服务不可用(503)',
  // custom-error-code
  2015: '该用户已经被列入黑名单',
  2014: '不合法的登录信息',
  2012: '您的账号已在其他地点登录',
  2011: '您已被强制下线',
  2010: '用户已被禁用',
  2006: '未登录或登录已经过期, 请重新登录',
  2005: '未能获取当前登录状态, 请重新登录',
  2002: '用户名或密码错误'
}

class HttpRequest {
  #instance = {}
  #config = {
    baseURL: '',
    timeout: 60000
  }

  constructor(baseURL) {
    this.initInstance(baseURL)
  }

  initInstance(baseURL) {
    const config = {
      baseURL,
      timeout: 60000
    }
    this.config = config

    const instance = axios.create(config)
    this.interceptors(instance)
    this.instance = instance
  }

  // 拦截器
  interceptors(service) {
    // 请求拦截器
    service.interceptors.request.use(
      config => {
        if (store.getters?.userInfo?.token) {
          config.headers['X-Access-Token'] = store.getters?.userInfo?.token
        }

        // 请求添加时间戳 防止缓存
        const timestamp = Date.parse(new Date()) / 1000
        if (config.url.indexOf('?') > -1) {
          config.url += `&n=${timestamp}`
        } else {
          config.url += `?n=${timestamp}`
        }

        return config
      },
      error => {
        console.log(error)
        return Promise.reject(error)
      }
    )

    // 响应拦截器
    service.interceptors.response.use(
      response => {
        const res = response.data
        if (res.status !== ERROR_OK) {
          const message = ERROR_CODE_MESSAGE[res.status] || `连接出错(${res.status})!`
          Message({
            message,
            type: 'error',
            duration: 5 * 1000,
          })

          if (res.status < 2015 && res.status > 2005) {
            let timeId = setTimeout(() => {
              store.commit('user/CLEAR_USER_INFO')
              location.reload()

              clearTimeout(timeId)
            }, 1000)
          }

          return Promise.reject(new Error(res.message || 'Error'))
        } else {
          return res
        }
      },
      error => {
        console.log('err' + error)
        Message({
          message: error.message,
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(error)
      }
    )
  }

  request(options) {
    return this.instance(options)
  }

  get(url, config) {
    return this.request({
      method: 'get',
      url,
      ...config
    })
  }

  post(url, config) {
    return this.request({
      method: 'post',
      url,
      ...config
    })
  }
}

export default HttpRequest
