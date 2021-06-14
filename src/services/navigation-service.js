import ajax from '@l/ajax-service'
import CONFIG from '@/config/config'

export const getNavigationMenusService = async payload => {
  return await ajax({
    url: `${CONFIG.API_URLS.MIS_CMS_Navigation_Rows_SubsetById_URL}/${payload}`,
    method: 'GET'
  })
}
