import ajax from './axios-interceptor'

const ajaxRequest = async param => {
  const result = await ajax.request({
    url: param.url || '',
    method: param.method || 'GET',
    responseType: param.responseType || 'json',
    data: param.data || null,
    params: param.params || '',
    cancelTimeout: param.cancelTimeout || false
  })
  return result
}

export default ajaxRequest
