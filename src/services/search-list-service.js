import ajax from '@l/ajax-service'
import CONFIG from '@/config/config'

export const searchListService = async payload => {
  return await ajax({
    url: CONFIG.API_URLS.MIS_CMS_Goods_Query_Page_URL,
    method: 'POST',
    data: payload
  })
}
