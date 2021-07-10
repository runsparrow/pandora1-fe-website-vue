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
    url: CONFIG.API_URLS.MIS_CMS_Auth_Regist,
    method: 'POST',
    data: payload
  })
}

export const submitForgotPwdService = async payload => {
  return await ajax({
    url: CONFIG.API_URLS.MIS_CMS_Auth_Forget,
    method: 'POST',
    data: payload
  })
}

export const checkMobileExistService = async payload => {
  return await ajax({
    url: `${CONFIG.API_URLS.Unauthorized_MIS_CMS_Member_Row_ByMobile}/${payload}`,
    method: 'GET',
    data: payload
  })
}

export const checkUseNameExistService = async payload => {
  return await ajax({
    url: `${CONFIG.API_URLS.Unauthorized_MIS_CMS_Member_Row_ByName}`,
    method: 'POST',
    data: payload
  })
}
export const getVIPListService = async payload => {
  return await ajax({
    url: `${CONFIG.API_URLS.Unauthorized_MIS_CMS_MemberPower_Query_Page_URL}`,
    method: 'POST',
    data: payload
  })
}
export const loginByCardService = async payload => {
  return await ajax({
    url: `${CONFIG.API_URLS.MIS_CMS_Auth_ActivateCard_URL}`,
    method: 'POST',
    data: payload
  })
}
