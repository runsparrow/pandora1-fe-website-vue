import ajax from '@l/ajax-service'
import CONFIG from '@/config/config'
import ajaxFile from '@l/ajax-file-interceptor'
import store from '@x'

export const uploadFileService = async payload => {
  return ajaxFile.post(process.env.VUE_APP_FILE_BASE_API_URL + CONFIG.API_URLS.Upload_API_URL, payload)
}
