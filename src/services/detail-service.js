import ajax from '@l/ajax-service'
import CONFIG from '@/config/config'

export const getDetailByIdService = async payload => {
  return await ajax({
    url: CONFIG.API_URLS.Unauthorized_MIS_CMS_Goods_Single_ById_URL,
    method: 'POST',
    data: payload
  })
}
