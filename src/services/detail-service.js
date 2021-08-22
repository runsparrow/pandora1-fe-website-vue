import ajax from '@l/ajax-service'
import CONFIG from '@/config/config'

export const getDetailByIdService = async payload => {
  return await ajax({
    url: CONFIG.API_URLS.Unauthorized_MIS_CMS_Goods_Single_ById_URL,
    method: 'POST',
    data: payload
  })
}

export const createCollectionService = async payload => {
  return await ajax({
    url: CONFIG.API_URLS.MIS_CMS_Collect_Create_Single_URL,
    method: 'POST',
    data: payload
  })
}
export const getCollectionByGoodsIdService = async payload => {
  return await ajax({
    url: `${CONFIG.API_URLS.MIS_CMS_Collect_Rows_ByGoodsId_URL}/${payload}`,
    method: 'GET'
  })
}
export const cancelCollectionByIdService = async payload => {
  return await ajax({
    url: `${CONFIG.API_URLS.MIS_CMS_Collect_Delete_Single_URL}`,
    method: 'POST',
    data: payload
  })
}
