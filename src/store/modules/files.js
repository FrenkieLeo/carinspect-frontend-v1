import { uploadFile, getFileInfo, deleteFile } from '@/api/file'
import { reject } from 'lodash'

const getDefaultState = () => {
  return {
    formData: {}
  }
}

const state = getDefaultState()

const mutations = {
  UPDATE_DRIVERS: (state, data) => {
    state.driverList = data
  }
}

const actions = {
  async upload({ commit, state }, sendFile) {
    return new Promise((resolve, reject) => {
      const formdata = new FormData()
      formdata.append('file', sendFile.file)
      formdata.append('click_module', sendFile.clickData.click_module)
      formdata.append('click_id', sendFile.clickData.click_id)
      formdata.append('click_name', sendFile.clickData.click_name)
      uploadFile(formdata).then(response => {
        console.log('upload', response)
        const { data } = response
        resolve(data)
        if (!data) {
          resolve('cannot upload')
        }
      })
    })
  },
  getFileInfo({ commit, state }, data) {
    return new Promise((resolve, rejcet) => {
      getFileInfo(data).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteFile({ commit, state }, data) {
    return new Promise((resolve, rejcet) => {
      deleteFile(data).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

