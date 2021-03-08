import axios from 'axios'

let ajaxQueues = {}
const ajax = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_URL,
  timeout: 1000 * 5
})

ajax.interceptors.request.use(
  config => {
    const { cancelTimeout, url } = config
    if (cancelTimeout) {
      config.timeout = 0
    }
    ajaxQueues[url] = true
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

ajax.interceptors.response.use(
  response => {
    const { config, status, data } = response
    delete ajaxQueues[config.url]
    // 关闭Spin
    if (status === 200) {
      return data
    } else {
      ajaxQueues = {}
      errorHandler(response)
      return Promise.reject(response.data)
    }
  },
  error => {
    // const errorObject = JSON.parse(JSON.stringify(error));
    // const {code,response,request,config} =errorObject;
    // 关闭Spin
    const { response } = error
    ajaxQueues = {}
    if (response) {
      errorHandler(response)
      return Promise.reject(response.data)
    } else {
      alert('网络连接异常,请稍后再试!')
    }
  }
)

const errorHandler = res => {
  switch (res.status) {
    case 401:
      break
    case 403:
      break
    case 404:
      break
    default:
      alert('网络连接错误')
  }
}

export default ajax
