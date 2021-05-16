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
    url: `${CONFIG.API_URLS.MIS_CMS_Authority_Create_ToStatus}`,
    method: 'POST',
    data: payload
  })
}

export const submitMyInfoDesignService = async payload => {
  return await ajax({
    url: `${CONFIG.API_URLS.MIS_CMS_Authority_Create_ToStatus}`,
    method: 'POST',
    data: payload
  })
}

export const getMyInfoByIdService = async (memberId, authorityIndex) => {
  return await ajax({
    url: `${CONFIG.API_URLS.MIS_CMS_Authority_Row_ByMemberId}/${memberId}/${authorityIndex}`,
    method: 'GET'
  })
}

export const getHostpitalsService = async payload => {
  return await ajax({
    url: `${CONFIG.API_URLS.MIS_ASM_Hospital_Query_Page}`,
    method: 'POST',
    data: payload
  })
}

export const submitMyInfoIndentityUpdateService = async payload => {
  return await ajax({
    url: `${CONFIG.API_URLS.MIS_CMS_Authority_Update_ToStatus}`,
    method: 'POST',
    data: payload
  })
}
