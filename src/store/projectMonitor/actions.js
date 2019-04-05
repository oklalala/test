/** @format */

import API from '@/utils/API'
import moment from 'moment'
import { saveAs } from 'file-saver'

export default {
  async fetchVgMeasuredData({ commit }, query) {
    const res = await API.GET(`/measures/vg`, query)
    commit('vgMeasuredData', res.data)
  },
  async fetchSoMeasuredData({ commit }, query) {
    const res = await API.GET(`/measures/so`, query)
    commit('soMeasuredData', res.data)
  },
  async export({ getters }, { type, projectId }) {
    const blob = await API.exportXls(`/measures/${type}/export`, { projectId })
    const time = moment().format('MMDD hhmm')
    return await saveAs(blob, `${getters.project.name}-${type}-${time}.xlsx`)
  }
}
