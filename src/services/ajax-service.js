import ajax from '../libs/axios-interceptor'

const ajaxRequest = param => {
  return ajax.request({
    url: param.url || '',
    method: param.method || 'GET',
    responseType: param.responseType || 'json',
    data: param.data || null,
    params: param.params || '',
    cancelTimeout: param.cancelTimeout || false
  })
}

export default ajaxRequest
