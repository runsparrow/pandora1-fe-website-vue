import ajax from '@l/ajax-service'
import CONFIG from '@/config/config'
import ajaxFile from '@l/ajax-file-interceptor'
import store from '@x'

export const uploadFileService = async payload => {
  return ajaxFile.post(CONFIG.API_URLS.File_Base_URL + CONFIG.API_URLS.Upload_API_URL, payload)
}
