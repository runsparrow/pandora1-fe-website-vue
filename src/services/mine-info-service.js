import ajax from '@l/ajax-service'
import CONFIG from '@/config/config'

export const getDcotorsService = async () => {
  return await ajax({
    url: CONFIG.API_URLS.MIS_ASM_Dictionary_Rows_ByParentKey,
    method: 'GET'
  })
}

export const getAreaInfoService = async payload => {
  return await ajax({
    url: `${CONFIG.API_URLS.MIS_ASM_Region_Rows_ByParentCode}/${payload}`,
    method: 'GET'
  })
}

export const getHospitalsService = async payload => {
  return await ajax({
    url: `${CONFIG.API_URLS.MIS_ASM_Hospital_Rows_ByPid}/${payload}`,
    method: 'GET'
  })
}

export const submitMyInfoIndentityService = async payload => {
  return await ajax({
    url: `${CONFIG.API_URLS.MIS_CMS_Authority_Create_Single}`,
    method: 'POST',
    data: payload
  })
}

export const getMyInfoByIdService = async payload => {
  return await ajax({
    url: `${CONFIG.API_URLS.MIS_CMS_Authority_Rows_ByApplierId}/${payload}`,
    method: 'GET'
  })
}