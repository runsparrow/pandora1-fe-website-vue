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

export const getTagsService = async () => {
  return await ajax({
    url: `${CONFIG.API_URLS.MIS_ASM_Dictionary_Rows_ByParentKey_tag}/cms.goods.tags`,
    method: 'GET'
  })
}

export const getProductClassifyService = async () => {
  return await ajax({
    url: `${CONFIG.API_URLS.MIS_ASM_Dictionary_Tree_SubsetByKey}/cms.goods.classify`,
    method: 'GET'
  })
}

export const getNavigationTreeService = async payload => {
  return await ajax({
    url: `${CONFIG.API_URLS.Unauthorized_MIS_CMS_Navigation_Tree_SubsetById}/${payload}`,
    method: 'GET'
  })
}

export const submitZuoPinService = async payload => {
  return await ajax({
    url: `${CONFIG.API_URLS.MIS_CMS_MemberAction_Upload}`,
    method: 'POST',
    data: payload
  })
}

export const mineZuoPinListService = async payload => {
  return await ajax({
    url: `${CONFIG.API_URLS.MIS_CMS_Goods_Query_Page_URL}`,
    method: 'POST',
    data: payload
  })
}
export const mineDownRecoredsService = async payload => {
  return await ajax({
    url: `${CONFIG.API_URLS.MIS_CMS_Down_Query_Page_URL}`,
    method: 'POST',
    data: payload
  })
}
export const mineCollectRecoredsService = async payload => {
  return await ajax({
    url: `${CONFIG.API_URLS.MIS_CMS_Collect_Query_Page_URL}`,
    method: 'POST',
    data: payload
  })
}
export const mineRechargeRecoredsService = async payload => {
  return await ajax({
    url: `${CONFIG.API_URLS.MIS_CMS_Recharge_Query_Page_URL}`,
    method: 'POST',
    data: payload
  })
}
export const mineCMSRowByIdService = async payload => {
  return await ajax({
    url: `${CONFIG.API_URLS.MIS_CMS_Member_Row_ById_URL}/${payload}`,
    method: 'GET'
  })
}
export const mineGetPayStatusService = async payload => {
  return await ajax({
    url: `${CONFIG.API_URLS.GET_PAYSTATUS_URL}`,
    method: 'POST'
  })
}
export const mineDelProductService = async payload => {
  return await ajax({
    url: `${CONFIG.API_URLS.MIS_CMS_Goods_Update_ToStatus_URL}`,
    method: 'POST',
    data: payload
  })
}
export const mineUpdateMemberService = async payload => {
  return await ajax({
    url: `${CONFIG.API_URLS.MIS_CMS_Member_Update_Single_URL}`,
    method: 'POST',
    data: payload
  })
}
export const mineUpdatePwdService = async payload => {
  return await ajax({
    url: `${CONFIG.API_URLS.MIS_AVM_Auth_ChangePassword_URL}`,
    method: 'POST',
    data: payload
  })
}
export const getZuoPinValidCountService = async payload => {
  return await ajax({
    url: `${CONFIG.API_URLS.MIS_CMS_Authority_Query_Page_URL}`,
    method: 'POST',
    data: payload
  })
}
export const getZuoPinByIdService = async payload => {
  return await ajax({
    url: `${CONFIG.API_URLS.MIS_CMS_Goods_Row_ById}/${payload}`,
    method: 'Get'
  })
}
