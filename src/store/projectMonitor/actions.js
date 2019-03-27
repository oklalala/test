import sendAPI from '@/utils/API'
import sendImageAPI from '@/utils/ImageAPI'

export default {
  fetchVgMeasuredData({ commit }, { projectId, date, floor }) {
    return sendAPI(
      'get',
      `/measures/vg?projectId=${projectId}&date=${date}&floor=${floor}`,
      true
    )
    .then(res => res.data.data)
    .then(data => {
      commit ('vgMeasuredData', data)
    })
  },
  fetchSoMeasuredData({ commit }, { projectId, locationNumber }) {
    return sendAPI(
      'get',
      `/measures/so?projectId=${projectId}&soLocationNumber=${locationNumber}`,
      true
    )
    .then(res => res.data.data)
    .then(data => {
      return commit ('soMeasuredData', data)
    })
  }
}
