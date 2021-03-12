import ajax from '@l/ajax-service'
import CONFIG from '@/config/config'

export const getUserInfoService = async payload => {
  return await ajax({
    url: CONFIG.API_URLS.MIS_CMS_Auth_GetToken,
    method: 'POST',
    data: payload
  })
}
