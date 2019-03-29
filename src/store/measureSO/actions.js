/** @format */

import API from '@/utils/API'

export default {
  uploadMeasuresDatas: (state, measuresData) => {
    return API.POST(`/measures/so`, measuresData)
  }
}
