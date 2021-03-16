import ajax from '@l/ajax-service'
import CONFIG from '@/config/config'

export const getUserInfoService = async payload => {
  return await ajax({
    url: CONFIG.API_URLS.MIS_CMS_Auth_GetToken,
    method: 'POST',
    data: payload
  })
}

export const getUserCodeService = async payload => {
  return await ajax({
    url: CONFIG.API_URLS.MIS_CMS_Auth_GetAuthCode,
    method: 'POST',
    data: payload
  })
}

export const submitUserCodeService = async payload => {
  return await ajax({
    url: CONFIG.API_URLS.MIS_CMS_Auth_GetAuth,
    method: 'POST',
    data: payload
  })
}

export const submitRegService = async payload => {
  return await ajax({
    url: CONFIG.API_URLS.Unauthorized_MIS_CMS_User_Create_Regist,
    method: 'POST',
    data: payload
  })
}
